import os
import torch
import numpy as np
from PIL import Image

# ===========================================================================
# 0. STRICT C++ ENGINE GUARDRAILS (MUST PRECEDE ALL PADDLE IMPORTS)
# ===========================================================================
# These OS flags intercept the Paddle framework's boot sequence, disabling 
# the experimental PIR compiler to prevent bounding box parsing crashes.
os.environ['FLAGS_enable_pir_api'] = '0'
os.environ['FLAGS_prim_all'] = 'false'

import paddle
# Dynamically mutate the active C++ backend registry to enforce the fallback.
try:
    paddle.set_flags({'FLAGS_enable_pir_api': 0})
except Exception:
    pass

from paddleocr import PaddleOCR
from transformers import AutoProcessor, AutoModelForTokenClassification

# ===========================================================================
# 1. TAXONOMY & ARCHITECTURE CONFIGURATION
# ===========================================================================
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_CHECKPOINT = "microsoft/layoutlmv3-base"

# The strict 30-class CORD taxonomy your model was optimized against.
CORD_LABELS = [
    "O", "B-menu.nm", "I-menu.nm", "B-menu.price", "I-menu.price",
    "B-menu.cnt", "I-menu.cnt", "B-menu.unitprice", "I-menu.unitprice",
    "B-total.total_price", "I-total.total_price", "B-total.cashprice", "I-total.cashprice",
    "B-total.changeprice", "I-total.changeprice", "B-total.menuqty_cnt", "I-total.menuqty_cnt",
    "B-total.sub_price", "I-total.sub_price", "B-total.tax_price", "I-total.tax_price",
    "B-store.nm", "I-store.nm", "B-store.addr", "I-store.addr",
    "B-store.tel", "I-store.tel", "B-sub_total.sub_price", "I-sub_total.sub_price", "B-sub_total.tax_price"
]
ID2LABEL = {i: label for i, label in enumerate(CORD_LABELS)}
NUM_LABELS = len(CORD_LABELS)

# Initialize Native DBNet + CRNN Engine (Bypassing PaddleX abstractions)
ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", show_log=False)

# Initialize Hugging Face Unified Processor (Handles BPE Tokenization + ViT Image Patching)
processor = AutoProcessor.from_pretrained(MODEL_CHECKPOINT, apply_ocr=False)


# ===========================================================================
# 2. OPTICAL EXTRACTION & GEOMETRIC RECTIFICATION
# ===========================================================================
def normalize_bbox(bbox, img_width, img_height):
    """
    Translates raw pixel coordinates into the strict [0, 1000] matrix limit
    required by the LayoutLM spatial embedding layers.
    """
    x0, y0, x1, y1 = bbox
    return [
        max(0, min(int(1000 * (x0 / img_width)), 1000)),
        max(0, min(int(1000 * (y0 / img_height)), 1000)),
        max(0, min(int(1000 * (x1 / img_width)), 1000)),
        max(0, min(int(1000 * (y1 / img_height)), 1000))
    ]

def extract_receipt_data(image_path):
    """
    Executes the optical forward pass and mathematically flattens 
    the 4-point spatial polygons into 2-point Axis-Aligned Bounding Boxes.
    """
    image = Image.open(image_path).convert("RGB")
    width, height = image.size
    
    raw_results = ocr_engine.ocr(image_path, cls=True)
    words, normalized_boxes = [], []

    if raw_results and raw_results[0]:
        for text_line in raw_results[0]:
            polygon = np.array(text_line[0])
            text_string = text_line[1][0].strip()

            if not text_string:
                continue

            # Calculate the absolute mathematical minimums and maximums across axes
            x_min, y_min = np.min(polygon[:, 0]), np.min(polygon[:, 1])
            x_max, y_max = np.max(polygon[:, 0]), np.max(polygon[:, 1])
            
            rigid_box = [int(x_min), int(y_min), int(x_max), int(y_max)]
            
            words.append(text_string)
            normalized_boxes.append(normalize_bbox(rigid_box, width, height))

    return image, words, normalized_boxes


# ===========================================================================
# 3. PRODUCTION INFERENCE ENGINE (FASTAPI DECOUPLED)
# ===========================================================================
class ReceiptExtractionEngine:
    """
    A decoupled, memory-locked microservice for processing unlabeled inference data.
    Designed to be instantiated as a singleton in the FastAPI lifespan manager.
    """
    def __init__(self, weights_path):
        self.model = AutoModelForTokenClassification.from_pretrained(
            MODEL_CHECKPOINT, num_labels=NUM_LABELS
        ).to(DEVICE)
        
        if os.path.exists(weights_path):
            self.model.load_state_dict(torch.load(weights_path, map_location=DEVICE))
        else:
            print(f"[!] WARNING: Target weights {weights_path} not found. Running naive initialization.")
            
        # Enforce permanent VRAM gradient lock. Disables dropout and autograd memory allocation.
        self.model.eval() 

    def parse(self, image_path):
        """
        Executes the full pipeline: OCR -> Tokenization -> Transformer -> JSON Reconstruction.
        """
        # 1. Execute Optical Extraction
        image, words, boxes = extract_receipt_data(image_path)
        if not words:
            return {}

        # 2. Tensor Dimensionality Mapping
        encoding = processor(
            image,
            words,
            boxes=boxes,
            truncation=True,
            padding="max_length",
            max_length=512,
            return_tensors="pt"
        )
        
        # 3. Deterministic Forward Pass (No Gradient Tape)
        with torch.no_grad():
            outputs = self.model(
                input_ids=encoding["input_ids"].to(DEVICE),
                attention_mask=encoding["attention_mask"].to(DEVICE),
                bbox=encoding["bbox"].to(DEVICE),
                pixel_values=encoding["pixel_values"].to(DEVICE)
            )
            
        # 4. Dimensionality Collapse (Argmax) & Payload Reconstruction
        predictions = outputs.logits.argmax(-1).squeeze().cpu().tolist()
        token_boxes = encoding.bbox.squeeze().cpu().tolist()
        
        extracted_entities = {}
        
        last_box = None
        last_clean_label = None
        
        for idx, pred_id in enumerate(predictions):
            label = ID2LABEL[pred_id]
            if label == "O":
                last_box = None
                last_clean_label = None
                continue
                
            is_b_tag = label.startswith("B-")
            clean_label = label[2:] # Strip the B- / I- BIO tags
            
            # Map sub-token fragments back to their original root word via spatial geometry
            current_box = tuple(token_boxes[idx])
            original_word = None
            
            for word, box in zip(words, boxes):
                if tuple(box) == current_box:
                    original_word = word
                    break
                    
            if not original_word:
                continue

            if clean_label not in extracted_entities:
                extracted_entities[clean_label] = []
                
            # Prevent concatenation duplication if multiple sub-tokens map to the same root word box
            if current_box == last_box and clean_label == last_clean_label:
                continue

            # If it's a B- tag or we don't have any entities yet, start a new one
            if is_b_tag or len(extracted_entities[clean_label]) == 0:
                extracted_entities[clean_label].append([original_word])
            else:
                extracted_entities[clean_label][-1].append(original_word)

            last_box = current_box
            last_clean_label = clean_label

        # Merge sub-tokens into final strings, returning a dictionary of lists
        return {k: [" ".join(entity) for entity in entities] for k, entities in extracted_entities.items()}
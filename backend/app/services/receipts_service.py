import os
import shutil
import uuid
from fastapi import UploadFile
from fastapi.concurrency import run_in_threadpool

# Path to the temp directory visible in your screenshot
TEMP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "temp")

async def process_receipt_image(file: UploadFile, ml_engine) -> dict:
    """
    Safely writes the byte stream to disk, routes it through the LayoutLMv3
    threadpool, and yields the structured JSON dictionary.
    """
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

    # Generate a collision-proof UUID for concurrent API requests
    transient_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(TEMP_DIR, transient_filename)

    try:
        # 1. Spool the uploaded bytes into the temp directory
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 2. Delegate the heavy tensor math to an ASGI background thread
        extracted_data = await run_in_threadpool(ml_engine.parse, file_path)
        
        # Safely extract the first element for scalar fields
        def get_first(key, default):
            val = extracted_data.get(key)
            return val[0] if val and len(val) > 0 else default

        # Reconstruct line items by zipping names and prices
        names = extracted_data.get("menu.nm", [])
        prices = extracted_data.get("menu.price", [])
        line_items = []
        for i in range(max(len(names), len(prices))):
            name = names[i] if i < len(names) else "Unknown Item"
            price = prices[i] if i < len(prices) else "0.00"
            line_items.append({"name": name, "price": price})

        # 3. Restructure for the React Frontend
        return {
            "merchant": get_first("store.nm", "Unknown"),
            "amount": get_first("total.total_price", "0.00"),
            "tax": get_first("total.tax_price", "0.00"),
            "date": get_first("date", ""),
            "items": line_items,
            "raw_payload": extracted_data # Send full payload for debugging
        }

    finally:
        # 4. Strict cleanup protocol
        if os.path.exists(file_path):
            os.remove(file_path)

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
        
        # 3. Restructure for the React Frontend
        return {
            "merchant": extracted_data.get("store.nm", "Unknown"),
            "amount": extracted_data.get("total.total_price", "0.00"),
            "tax": extracted_data.get("total.tax_price", "0.00"),
            "date": extracted_data.get("date", ""),
            "raw_payload": extracted_data # Send full payload for debugging
        }

    finally:
        # 4. Strict cleanup protocol
        if os.path.exists(file_path):
            os.remove(file_path)

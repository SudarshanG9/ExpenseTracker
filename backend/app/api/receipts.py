from fastapi import APIRouter, UploadFile, File, Request, HTTPException
from app.services.receipts_service import process_receipt_image

router = APIRouter(prefix="/api/receipts", tags=["receipts"])

@router.post("/extract")
async def extract_receipt(request: Request, file: UploadFile = File(...)):
    # Validate MIME type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be an image.")

    # Access the global singleton engine initialized in main.py
    engine = request.app.state.ml_engine
    if not engine:
        raise HTTPException(status_code=503, detail="ML Engine not initialized.")

    try:
        # Execute the extraction service
        extracted_data = await process_receipt_image(file, engine)
        return {
            "status": "success",
            "data": extracted_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")
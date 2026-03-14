from fastapi import APIRouter,UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.receipts_service import ocr
import os
import shutil

router = APIRouter(prefix="/receipts", tags=["receipts"])


@router.post("/scan")
async def scan_receipt(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        raise HTTPException(status_code=400, detail="Invalid file format")

    os.makedirs("temp", exist_ok = True)

    file_path = f"temp/{file.filename}"

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    expenses = ocr(file_path, db)

    return {"message": "Receipt scanned successfully", "expenses": expenses}
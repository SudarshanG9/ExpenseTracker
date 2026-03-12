from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_receipts():
    return [{"id": 1, "status": "processed"}]

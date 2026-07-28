from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.user_service import get_or_create_user, update_user
from app.schemas.user import UserUpdate, UserResponse

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/", response_model=UserResponse)
async def get_user_endpoint(db: Session = Depends(get_db)):
    return get_or_create_user(db)

@router.put("/", response_model=UserResponse)
async def update_user_endpoint(user: UserUpdate, db: Session = Depends(get_db)):
    return update_user(db, user)

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str
    date: datetime
    description: Optional[str] = None
    receipt_url: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[datetime] = None
    description: Optional[str] = None
    receipt_url: Optional[str] = None

class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

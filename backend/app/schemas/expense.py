from pydantic import BaseModel
from typing import Optional
from datetime import date,datetime

class ExpenseBase(BaseModel):
    title: str
    amount: float
    category: str
    date: date
    description: Optional[str] = None
    receipt_url: Optional[str] = None

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[date] = None
    description: Optional[str] = None
    receipt_url: Optional[str] = None

class ExpenseResponse(ExpenseBase):
    id: int
    created_at: datetime | None = None

    class Config:
        orm_mode = True

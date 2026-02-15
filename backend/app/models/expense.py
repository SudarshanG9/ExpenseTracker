from pydatnic import BaseModel
from typing import Optional


class ExpenseCreate(BaseModel):
    name: str
    amount: float
    category: str
    date: date

class ExpenseUpdate(BaseModel):
    name: Optional[str] = None
    amount: Optional[float] = None
    category: Optional[str] = None
    date: Optional[date] = None



class ExpenseResponse(BaseModel):
    id: int
    name: str
    amount: float
    category: str
    date: date




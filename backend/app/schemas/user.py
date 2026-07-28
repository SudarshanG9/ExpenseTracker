from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: str
    initial_balance: float

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    initial_balance: Optional[float] = None

class UserResponse(UserBase):
    id: int

    model_config = {"from_attributes": True}

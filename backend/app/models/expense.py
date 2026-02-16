from sqlalchemy import Column, Integer, String, Float, DateTime, func
from app.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    amount = Column(Float)
    category = Column(String, index=True)
    date = Column(DateTime)
    description = Column(String, nullable=True)
    receipt_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

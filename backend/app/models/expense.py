from sqlalchemy import Column, Integer, String, Float, Date, DateTime, func
from app.database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    description = Column(String, nullable=True)
    receipt_url = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())



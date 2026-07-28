from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, default="Sudarshan")
    email = Column(String, nullable=False, default="sudarshan@example.com")
    initial_balance = Column(Float, nullable=False, default=50000.00)

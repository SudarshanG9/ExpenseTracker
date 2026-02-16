from sqlalchemy.orm import Session
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate
from datetime import datetime

def get_expense(db: Session, expense_id: int):
    return db.query(Expense).filter(Expense.id == expense_id).first()

def get_expenses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Expense).offset(skip).limit(limit).all()

def create_expense(db: Session, expense: ExpenseCreate):
    db_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
        description=expense.description,
        receipt_url=expense.receipt_url,
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def delete_expense(db: Session, expense_id: int):
    db_expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if db_expense:
        db.delete(db_expense)
        db.commit()
    return db_expense

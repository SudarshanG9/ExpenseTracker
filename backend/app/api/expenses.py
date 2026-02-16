from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import crud, models, schemas
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ExpenseResponse)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    return crud.create_expense(db=db, expense=expense)

@router.get("/", response_model=List[schemas.ExpenseResponse])
def read_expenses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    expenses = crud.get_expenses(db, skip=skip, limit=limit)
    return expenses

@router.get("/{expense_id}", response_model=schemas.ExpenseResponse)
def read_expense(expense_id: int, db: Session = Depends(get_db)):
    db_expense = crud.get_expense(db, expense_id=expense_id)
    if db_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return db_expense

@router.delete("/{expense_id}", response_model=schemas.ExpenseResponse)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    db_expense = crud.delete_expense(db, expense_id=expense_id)
    if db_expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return db_expense

from sqlalchemy.orm import Session 
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseUpdate



def create_expense(db: Session, expense_data: ExpenseCreate):

    expense = Expense(
        title = expense_data.title,
        amount = expense_data.amount,
        category = expense_data.category,
        date = expense_data.date
    )
    
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense



def get_expenses(db: Session):
    return db.query(Expense).all()


def get_expense(db: Session,expense_id: int):
    return db.query(Expense).filter(Expense.id == expense_id).first()


def update_expense(db: Session,expense_id: int, update_data: ExpenseUpdate): 
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not expense:
        return None
    
    if update_data.title:
        expense.title = update_data.title
    if update_data.amount:
        expense.amount = update_data.amount
    if update_data.category:
        expense.category = update_data.category
    if update_data.date:
        expense.date = update_data.date
    if update_data.description:
        expense.description = update_data.description
    if update_data.receipt_url:
        expense.receipt_url = update_data.receipt_url
    
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


def delete_expense(db: Session,expense_id: int):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()

    if not expense:
        return None
    
    db.delete(expense)
    db.commit()
    return expense
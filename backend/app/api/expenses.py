from app.services.expense_tracker import create_expense, get_expenses, update_expense, delete_expense
from app.models.expense import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from fastapi import APIRouter

router = APIRouter()


@router.post("/", response_model=ExpenseResponse)
async def create_expense_endpoint(expense: ExpenseCreate):
    return create_expense(expense)


@router.get("/", response_model=list[ExpenseResponse])
async def get_expenses_endpoint():
    return get_expenses()


@router.put("/{expense_id}", response_model=ExpenseResponse)
async def update_expense_endpoint(expense_id: int, expense: ExpenseUpdate):
    return update_expense(expense_id, expense)


@router.delete("/{expense_id}", response_model=ExpenseResponse)
async def delete_expense_endpoint(expense_id: int):
    return delete_expense(expense_id)
from app.services.expense_tracker import create_expense, get_expenses, get_expense,update_expense, delete_expense
from app.models.expense import ExpenseCreate, ExpenseUpdate, ExpenseResponse
from fastapi import APIRouter

router = APIRouter(prefix="/expenses", tags=["expenses"])


@router.post("/", response_model=ExpenseResponse)
async def create_expense_endpoint(expense: ExpenseCreate, db: Session = Depends(get_db)):
    return create_expense(db, expense)


@router.get("/", response_model=list[ExpenseResponse])
async def get_expenses_endpoint(db: Session = Depends(get_db)):
    return get_expenses(db)


@router.get("/{expense_id}", response_model=ExpenseResponse)
async def get_expense_endpoint(expense_id: int, db: Session = Depends(get_db)):
    expense = get_expense(db, expense_id)

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@router.put("/{expense_id}", response_model=ExpenseResponse)
async def update_expense_endpoint(expense_id: int, expense: ExpenseUpdate, db: Session = Depends(get_db)):
    expense = update_expense(db, expense_id, expense)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense


@router.delete("/{expense_id}", response_model=ExpenseResponse)
async def delete_expense_endpoint(expense_id: int, db: Session = Depends(get_db)):
    expense = delete_expense(db, expense_id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense
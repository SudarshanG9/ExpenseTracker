from app.models.expenses import ExpenseCreate, ExpenseUpdate, ExpenseResponse

temp_expense = []
expense_id = 1


def create_expense(expense: ExpenseCreate) -> ExpenseResponse:
    global expense_id
    newExpense = expense.dict()

    newExpense['id'] = expense_id
    expense_id += 1
    temp_expense.append(newExpense)
    return newExpense




def get_expenses() -> list[ExpenseResponse]:
    return temp_expense


def update_expense(expense_id: int, expense: ExpenseUpdate) -> ExpenseResponse:
    for expense in temp_expense:
        if expense['id'] == expense_id:
            expense.update(expense.dict())
            return expense
    return None


def delete_expense(expense_id: int) -> ExpenseResponse:
    for expense in temp_expense:
        if expense['id'] == expense_id:
            temp_expense.remove(expense)
            return expense
    return None

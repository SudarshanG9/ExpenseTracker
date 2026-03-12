from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import expenses, receipts

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(expenses.router,prefix="/expenses",tags=["expenses"])
app.include_router(receipts.router,prefix="/receipts",tags=["receipts"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Expense Tracker API"}
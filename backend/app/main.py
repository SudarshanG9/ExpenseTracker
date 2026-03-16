from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import expenses, receipts
from app.database import create_tables
import app.models.expense  # ensure model is registered with Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables on startup
create_tables()

# Routers already define their own prefix, so no prefix needed here
app.include_router(expenses.router)
app.include_router(receipts.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Expense Tracker API"}
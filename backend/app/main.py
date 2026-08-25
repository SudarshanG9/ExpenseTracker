from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import expenses, receipts, user
from app.database import create_tables
import os
import app.models.expense  # ensure model is registered with Base
import app.models.user
from contextlib import asynccontextmanager
from app.services.ml_engine import ReceiptExtractionEngine

WEIGHTS_PATH = os.path.join(os.path.dirname(__file__), 'services', 'weights.pth')
@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- STARTUP PHASE ---
    print("[*] Booting Machine Learning Pipeline...")
    # Instantiate the engine globally. This takes 2-4 seconds but only happens once.
    app.state.ml_engine = ReceiptExtractionEngine(weights_path=WEIGHTS_PATH)
    print("[+] Model loaded into ASGI memory.")
    
    yield
    
    # --- SHUTDOWN PHASE ---
    print("[*] Releasing ML Engine from memory...")
    app.state.ml_engine = None

app = FastAPI(lifespan=lifespan)

frontend_url = os.getenv("FRONTEND_URL")
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables on startup
create_tables()

# Routers already define their own prefix, so no prefix needed here
app.include_router(expenses.router)
app.include_router(receipts.router)
app.include_router(user.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Expense Tracker API"}
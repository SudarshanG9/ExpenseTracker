import pytesseract
import cv2
import re
from datetime import datetime


from app.services.expense_service import create_expense
from sqlalchemy.orm import Session
from app.schemas.expense import ExpenseCreate




def preprocess_image(image_path: str):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    return thresh


def extract_text(image_path: str):
    image = preprocess_image(image_path)
    text = pytesseract.image_to_string(image)
    return text


def extract_product(text: str):
    
    pattern = r"([A-Za-z\s]+)[\.\s]+(\d+\.\d+)"

    matches = re.findall(pattern, text)

    products = []

    for name,price in matches:
        product = {
            "name": name.strip(),
            "price": float(price)
        }
        products.append(product)
    return products

def extract_total(text: str):
    pattern = r"Total:\s+(\d+\.\d+)"
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        return float(match.group(1))

    return None


def extract_date(text: str):
    pattern = r"(\d{2}/\d{2}/\d{4})"
    match = re.search(pattern, text)
    if match:
        return datetime.strptime(match.group(1), "%m/%d/%Y").date()
    




CATEGORY = {
    "Food": ["restaurant", "cafe", "coffee", "pizza", "burger", "starbucks"],
    "Transport": ["uber", "ola", "taxi", "fuel", "petrol"],
    "Shopping": ["amazon", "mall", "store"],
    "Groceries": ["walmart", "supermarket", "grocery"]
}




def classify_category(text: str):
    for category, keywords in CATEGORY.items():
        for keyword in keywords:
            if keyword in text.lower():
                return category
    return "Misc"

    
def ocr(image_path: str, db: Session):
    text = extract_text(image_path)
    products = extract_product(text)
    total = extract_total(text)
    date = extract_date(text)

    expenses = []

    if products:
        for product in products:
            expense_record = ExpenseCreate(
                title=product["name"],
                amount=product["price"],
                category=classify_category(product["name"]),
                date=date or datetime.now().date(),
                description="",
                receipt_url=image_path
            )
            expense = create_expense(db, expense_record)
            expenses.append(expense)
    elif total:
        expense_record = ExpenseCreate(
            title="Receipt",
            amount=total,
            category=classify_category(text),
            date=date or datetime.now().date(),
            description="",
            receipt_url=image_path
        )
        expense = create_expense(db, expense_record)
        expenses.append(expense)

    return expenses


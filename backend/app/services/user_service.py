from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserUpdate

def get_or_create_user(db: Session) -> User:
    user = db.query(User).first()
    if not user:
        user = User(name="Sudarshan", email="sudarshan@example.com", initial_balance=50000.00)
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

def update_user(db: Session, user_update: UserUpdate) -> User:
    user = get_or_create_user(db)
    
    update_data = user_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
        
    db.commit()
    db.refresh(user)
    return user

from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
import schemas
import auth
from datetime import datetime, timedelta
import schemas
import auth

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Branch Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def seed_user():
    # Auto-fix: Drop and recreate visitors table to ensure schema matches
    models.Visitor.__table__.drop(engine, checkfirst=True)
    models.Visitor.__table__.create(engine)

    db = next(get_db())
    existing_user = db.query(models.User).filter(models.User.username == "sharada").first()
    if not existing_user:
        hashed_pw = auth.get_password_hash("Themother1")
        new_user = models.User(username="sharada", hashed_password=hashed_pw)
        db.add(new_user)
        db.commit()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Branch Management API"}

@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check API to verify if the server is running.
    """
    return {"status": "ok", "message": "API is healthy"}

@app.get("/time", tags=["Utility"])
def get_time():
    """
    Returns the current time in Indian Standard Time (IST)
    """
    ist_time = datetime.utcnow() + timedelta(hours=5, minutes=30)
    return {"time": ist_time.isoformat()}

@app.post("/login", response_model=schemas.Token, tags=["Authentication"])
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == user_credentials.username).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
        
    if not auth.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
        
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# --- Location Endpoints ---
@app.get("/locations", response_model=List[schemas.LocationOut], tags=["Locations"])
def get_locations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Location).offset(skip).limit(limit).all()

@app.post("/locations", response_model=schemas.LocationOut, status_code=status.HTTP_201_CREATED, tags=["Locations"])
def create_location(location: schemas.LocationCreate, db: Session = Depends(get_db)):
    new_location = models.Location(**location.dict())
    db.add(new_location)
    db.commit()
    db.refresh(new_location)
    return new_location

@app.put("/locations/{location_id}", response_model=schemas.LocationOut, tags=["Locations"])
def update_location(location_id: int, location: schemas.LocationCreate, db: Session = Depends(get_db)):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()
    if not db_location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Location not found")
    for key, value in location.dict().items():
        setattr(db_location, key, value)
    db.commit()
    db.refresh(db_location)
    return db_location

@app.delete("/locations/{location_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Locations"])
def delete_location(location_id: int, db: Session = Depends(get_db)):
    db_location = db.query(models.Location).filter(models.Location.id == location_id).first()
    if not db_location:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Location not found")
    db.delete(db_location)
    db.commit()

# --- Visitor Endpoints ---
@app.get("/reset-visitors-db", tags=["Visitors"])
def reset_visitors_db():
    models.Visitor.__table__.drop(engine, checkfirst=True)
    models.Visitor.__table__.create(engine)
    return {"message": "Visitors table dropped and recreated"}

@app.get("/visitors", response_model=List[schemas.VisitorOut], tags=["Visitors"])
def get_visitors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Visitor).offset(skip).limit(limit).all()

@app.post("/visitors", response_model=schemas.VisitorOut, status_code=status.HTTP_201_CREATED, tags=["Visitors"])
def create_visitor(visitor: schemas.VisitorCreate, db: Session = Depends(get_db)):
    new_visitor = models.Visitor(**visitor.dict())
    db.add(new_visitor)
    db.commit()
    db.refresh(new_visitor)
    return new_visitor

# --- Member Endpoints ---
@app.get("/members", response_model=List[schemas.MemberOut], tags=["Members"])
def get_members(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Member).offset(skip).limit(limit).all()

@app.post("/members", response_model=schemas.MemberOut, status_code=status.HTTP_201_CREATED, tags=["Members"])
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    new_member = models.Member(**member.dict())
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member

@app.put("/members/{member_id}", response_model=schemas.MemberOut, tags=["Members"])
def update_member(member_id: int, member: schemas.MemberCreate, db: Session = Depends(get_db)):
    db_member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found")
    for key, value in member.dict().items():
        setattr(db_member, key, value)
    db.commit()
    db.refresh(db_member)
    return db_member

@app.delete("/members/{member_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Members"])
def delete_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(models.Member).filter(models.Member.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Member not found")
    db.delete(db_member)
    db.commit()

# --- Vendor Endpoints ---
@app.get("/vendors", response_model=List[schemas.VendorOut], tags=["Vendors"])
def get_vendors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Vendor).offset(skip).limit(limit).all()

@app.post("/vendors", response_model=schemas.VendorOut, status_code=status.HTTP_201_CREATED, tags=["Vendors"])
def create_vendor(vendor: schemas.VendorCreate, db: Session = Depends(get_db)):
    new_vendor = models.Vendor(**vendor.dict())
    db.add(new_vendor)
    db.commit()
    db.refresh(new_vendor)
    return new_vendor

# --- Customer Endpoints ---
@app.get("/customers", response_model=List[schemas.CustomerOut], tags=["Customers"])
def get_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Customer).offset(skip).limit(limit).all()

@app.post("/customers", response_model=schemas.CustomerOut, status_code=status.HTTP_201_CREATED, tags=["Customers"])
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    new_customer = models.Customer(**customer.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer

# --- Expense Endpoints ---
@app.get("/expenses", response_model=List[schemas.ExpenseOut], tags=["Expenses"])
def get_expenses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Expense).offset(skip).limit(limit).all()

@app.post("/expenses", response_model=schemas.ExpenseOut, status_code=status.HTTP_201_CREATED, tags=["Expenses"])
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = models.Expense(**expense.dict())
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

# --- Inventory Endpoints ---
@app.get("/inventory", response_model=List[schemas.InventoryItemOut], tags=["Inventory"])
def get_inventory(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.InventoryItem).offset(skip).limit(limit).all()

@app.post("/inventory", response_model=schemas.InventoryItemOut, status_code=status.HTTP_201_CREATED, tags=["Inventory"])
def create_inventory_item(item: schemas.InventoryItemCreate, db: Session = Depends(get_db)):
    new_item = models.InventoryItem(**item.dict())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


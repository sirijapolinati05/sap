from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
import schemas
import auth
from datetime import datetime, timedelta, date
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

@app.put("/visitors/{visitor_id}", response_model=schemas.VisitorOut, tags=["Visitors"])
def update_visitor(visitor_id: int, visitor: schemas.VisitorCreate, db: Session = Depends(get_db)):
    db_visitor = db.query(models.Visitor).filter(models.Visitor.id == visitor_id).first()
    if not db_visitor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Visitor not found")
    for key, value in visitor.dict().items():
        setattr(db_visitor, key, value)
    db.commit()
    db.refresh(db_visitor)
    return db_visitor

# --- Member Endpoints ---
@app.get("/members/stats", tags=["Members"])
def get_members_stats(db: Session = Depends(get_db)):
    members = db.query(models.Member).all()
    today = date.today()
    
    stats = {
        "membership_status": {"Active": 0, "Inactive": 0},
        "profile_completeness": {"Complete": 0, "Incomplete": 0},
        "relation_with_sas": {"SAS Members": 0, "SAS MC Member": 0},
        "membership_category": {
            "Member with Magazine-3 Year": 0,
            "Member with Magazine-5 Year": 0,
            "Member with Magazine-10 Year": 0,
            "Member without Magazine-3 Year": 0,
            "Lifetime Members-99 Year": 0,
            "Member without Magazine-1 Year": 0,
            "Member with Magazine-1 Year": 0
        }
    }
    
    for m in members:
        # Membership Status
        if not m.membership_ends_on or m.membership_ends_on >= today:
            stats["membership_status"]["Active"] += 1
        else:
            stats["membership_status"]["Inactive"] += 1
            
        # Profile Completeness
        if m.first_name and m.last_name and m.contact_number and m.email:
            stats["profile_completeness"]["Complete"] += 1
        else:
            stats["profile_completeness"]["Incomplete"] += 1
            
        # Relation with SAS
        if m.relation_with_sas == "SAS Member":
            stats["relation_with_sas"]["SAS Members"] += 1
        elif m.relation_with_sas == "SAS MC Member":
            stats["relation_with_sas"]["SAS MC Member"] += 1
        else:
            if m.relation_with_sas:
                if m.relation_with_sas not in stats["relation_with_sas"]:
                    stats["relation_with_sas"][m.relation_with_sas] = 0
                stats["relation_with_sas"][m.relation_with_sas] += 1
                
        # Membership Category
        cat = m.membership_category
        if cat:
            if cat not in stats["membership_category"]:
                stats["membership_category"][cat] = 0
            stats["membership_category"][cat] += 1
            
    return stats

@app.get("/members", response_model=List[schemas.MemberOut], tags=["Members"])
def get_members(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Member).offset(skip).limit(limit).all()

# --- Home Screen Widgets ---
@app.get("/home/upcoming-birthdays", tags=["Home"])
def get_upcoming_birthdays(days: int = 30, db: Session = Depends(get_db)):
    """
    Returns members whose birthday (month/day) falls within the next `days` days.
    """
    today = date.today()
    results = []
    members = db.query(models.Member).filter(models.Member.dob != None).all()
    for m in members:
        dob = m.dob
        # Compute the birthday this year; if already passed, check next year
        try:
            birthday_this_year = dob.replace(year=today.year)
        except ValueError:
            # Feb 29 on non-leap year -> use Mar 1
            birthday_this_year = date(today.year, 3, 1)
        if birthday_this_year < today:
            try:
                birthday_this_year = dob.replace(year=today.year + 1)
            except ValueError:
                birthday_this_year = date(today.year + 1, 3, 1)
        delta = (birthday_this_year - today).days
        if 0 <= delta <= days:
            name_parts = [p for p in [m.title, m.first_name, m.last_name] if p]
            full_name = " ".join(name_parts)
            results.append({
                "name": full_name,
                "dob": dob.strftime("%d-%b"),
                "days_away": delta,
            })
    results.sort(key=lambda x: x["days_away"])
    return results

@app.get("/home/membership-renewals", tags=["Home"])
def get_membership_renewals(days: int = 30, db: Session = Depends(get_db)):
    """
    Returns members whose membership expires within the next `days` days.
    """
    today = date.today()
    cutoff = today + timedelta(days=days)
    members = (
        db.query(models.Member)
        .filter(
            models.Member.membership_ends_on != None,
            models.Member.membership_ends_on >= today,
            models.Member.membership_ends_on <= cutoff,
        )
        .order_by(models.Member.membership_ends_on)
        .all()
    )
    results = []
    for m in members:
        name_parts = [p for p in [m.title, m.first_name, m.last_name] if p]
        full_name = " ".join(name_parts)
        results.append({
            "name": full_name,
            "membership_ends_on": m.membership_ends_on.strftime("%d-%b-%Y"),
            "days_remaining": (m.membership_ends_on - today).days,
        })
    return results

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

@app.get("/invoices", response_model=List[schemas.InvoiceOut], tags=["Invoices"])
def get_invoices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    invoices = db.query(models.Invoice).offset(skip).limit(limit).all()
    return invoices

@app.post("/invoices", response_model=schemas.InvoiceOut, tags=["Invoices"])
def create_invoice(invoice: schemas.InvoiceCreate, db: Session = Depends(get_db)):
    db_invoice = models.Invoice(**invoice.dict())
    db.add(db_invoice)
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

@app.put("/invoices/{invoice_id}", response_model=schemas.InvoiceOut, tags=["Invoices"])
def update_invoice(invoice_id: str, invoice: schemas.InvoiceCreate, db: Session = Depends(get_db)):
    db_invoice = db.query(models.Invoice).filter(models.Invoice.id == invoice_id).first()
    if not db_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    
    update_data = invoice.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_invoice, key, value)
        
    db.commit()
    db.refresh(db_invoice)
    return db_invoice

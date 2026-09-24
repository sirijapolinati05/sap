from sqlalchemy import Column, Integer, String, Boolean, Date, Float, ForeignKey, JSON
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    sas_company_id = Column(String, nullable=False)
    location_code = Column(String, nullable=False)
    add1 = Column(String, nullable=False)
    add2 = Column(String)
    add3 = Column(String)
    city = Column(String)
    zip_code = Column(String)
    gst_reg_type = Column(String)
    gst_no = Column(String)
    tin_no = Column(String)
    vat_no = Column(String)
    phone_no = Column(String)
    fax_no = Column(String)
    address_type = Column(String)
    contact_1_name = Column(String)
    contact_1_dept = Column(String)
    contact_1_design = Column(String)
    contact_1_contact_no = Column(String)
    contact_1_email = Column(String)
    contact_2_name = Column(String)
    contact_2_dept = Column(String)
    contact_2_design = Column(String)
    contact_2_contact_no = Column(String)
    contact_2_email = Column(String)
    country = Column(String)
    state = Column(String)

class Visitor(Base):
    __tablename__ = "visitors"
    
    id = Column(Integer, primary_key=True, index=True)
    member_or_visitor = Column(String, nullable=True)
    visit_date = Column(Date, nullable=True)
    visit_purpose = Column(String, nullable=True)
    interested_to_become_member = Column(Boolean, default=False)
    
    country_code = Column(String)
    mobile = Column(String)
    email = Column(String)
    address_1 = Column(String)
    address_2 = Column(String)
    address_3 = Column(String)
    city = Column(String)
    pincode = Column(String)
    country = Column(String)
    state = Column(String)
    
    title = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(Date)

class Member(Base):
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    first_name = Column(String)
    last_name = Column(String, nullable=False)
    dob = Column(Date)
    occupation = Column(String)
    designation = Column(String)
    organization = Column(String)
    contact_number = Column(String, nullable=False)
    isd_code = Column(String, nullable=False)
    email = Column(String)
    h_no = Column(String)
    street = Column(String)
    locality = Column(String)
    city = Column(String)
    pincode = Column(String, nullable=False)
    country = Column(String)
    state = Column(String)
    ref_member_no = Column(String)
    relation_with_sas = Column(String)
    preferred_language = Column(String)
    paid_on = Column(Date)
    membership_amount = Column(Float)
    membership_category = Column(String, nullable=False)
    joining_date = Column(Date)
    membership_ends_on = Column(Date)
    introduced_by = Column(String)

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(Integer, primary_key=True, index=True)
    vendor_name = Column(String, nullable=False)
    gstin = Column(String)
    address_1 = Column(String)
    address_2 = Column(String)
    address_3 = Column(String)
    city = Column(String)
    pincode = Column(String)
    country = Column(String)
    state = Column(String)

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    gstin = Column(String)
    address_1 = Column(String)
    address_2 = Column(String)
    address_3 = Column(String)
    city = Column(String)
    pincode = Column(String)
    country = Column(String)
    state = Column(String)

class Expense(Base):
    __tablename__ = "expenses"
    
    id = Column(Integer, primary_key=True, index=True)
    voucher_no = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    payment_mode = Column(String, nullable=False)
    gl_head = Column(String, nullable=False)
    expense_type = Column(String, nullable=False)
    expense_category = Column(String, nullable=False)
    narration = Column(String)
    gross_amount = Column(Float, nullable=False)
    tds = Column(Float)
    net_amount = Column(Float, nullable=False)

class InventoryItem(Base):
    __tablename__ = "inventory_items"
    
    id = Column(Integer, primary_key=True, index=True)
    group_name = Column(String, nullable=False)
    sub_group = Column(String, nullable=False)
    item_type = Column(String, nullable=False)
    item_category = Column(String, nullable=False)
    item_code = Column(String, nullable=False)
    item_name = Column(String, nullable=False)
    description = Column(String)
    print_name = Column(String)
    hsn_code = Column(String)
    measure_unit = Column(String, nullable=False)
    storage_type = Column(String)
    inventory_val = Column(String)
    stock_maintain = Column(Boolean, default=False)
    opening_qty = Column(Float)
    opening_rate = Column(Float)
    opening_value = Column(Float)
    min_qty = Column(Float)
    max_qty = Column(Float)
    reorder_level = Column(Float)
    dimension_l = Column(Float)
    dimension_w = Column(Float)
    dimension_h = Column(Float)
    area = Column(Float)
    weight = Column(Float)

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(String, primary_key=True, index=True)
    date = Column(String, nullable=False)
    customer = Column(String, nullable=False)
    amount = Column(String, nullable=False)
    status = Column(String, nullable=False)
    items = Column(JSON, default=list)
    customerPhone = Column(String)
    customerAddress = Column(String)
    customerState = Column(String)
    otherCharges = Column(String)
    payments = Column(JSON, default=list)
    documentType = Column(String, default="Tax invoice")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    item_name = Column(String, nullable=False)
    description = Column(String)
    item_code = Column(String)
    hsn_sac = Column(String)
    reorder_quantity = Column(Integer)
    tags = Column(JSON, default=list)
    status = Column(Boolean, default=True)
    uom = Column(String)
    purchase_price = Column(Float)
    mrp = Column(Float)
    sales_price = Column(Float)
    tax = Column(String)
    image_path = Column(String)

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    status = Column(String, default="pending")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=True)
    parent = Column(String, nullable=True)
    code = Column(String, nullable=True)
    name = Column(String, nullable=False, unique=True)
    hsn = Column(String, nullable=True)
    vendor = Column(String, nullable=True)
    tax = Column(String, nullable=True)
    status = Column(String, default="Active")

from sqlalchemy import Column, Integer, String, Boolean, Date, Float, ForeignKey
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
    member_or_visitor = Column(String, nullable=False)
    visit_date = Column(Date, nullable=False)
    visit_purpose = Column(String, nullable=False)
    interested_to_become_member = Column(Boolean, default=False)
    # The list grid uses Title, FirstName, LastName, DOB, Mobile, Email, VisitDate, Purpose, MembershipType.
    # It seems there's a link to the actual person (Member or just Visitor details)
    # Since the frontend form (Visitor Register) doesn't have name fields, we'll assume it links or we add them.
    # For now, let's add basic fields as seen in the grid:
    title = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    dob = Column(Date)
    mobile = Column(String)
    email = Column(String)

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


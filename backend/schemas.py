from pydantic import BaseModel
from typing import Optional
from datetime import date

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class LocationBase(BaseModel):
    sas_company_id: str
    location_code: str
    add1: str
    add2: Optional[str] = None
    add3: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    gst_reg_type: Optional[str] = None
    gst_no: Optional[str] = None
    tin_no: Optional[str] = None
    vat_no: Optional[str] = None
    phone_no: Optional[str] = None
    fax_no: Optional[str] = None
    address_type: Optional[str] = None
    contact_1_name: Optional[str] = None
    contact_1_dept: Optional[str] = None
    contact_1_design: Optional[str] = None
    contact_1_contact_no: Optional[str] = None
    contact_1_email: Optional[str] = None
    contact_2_name: Optional[str] = None
    contact_2_dept: Optional[str] = None
    contact_2_design: Optional[str] = None
    contact_2_contact_no: Optional[str] = None
    contact_2_email: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class LocationOut(LocationBase):
    id: int
    class Config:
        orm_mode = True

class VisitorBase(BaseModel):
    member_or_visitor: str
    visit_date: date
    visit_purpose: str
    interested_to_become_member: bool = False
    title: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    dob: Optional[date] = None
    mobile: Optional[str] = None
    email: Optional[str] = None

class VisitorCreate(VisitorBase):
    pass

class VisitorOut(VisitorBase):
    id: int
    class Config:
        orm_mode = True

class MemberBase(BaseModel):
    title: Optional[str] = None
    first_name: Optional[str] = None
    last_name: str
    dob: Optional[date] = None
    occupation: Optional[str] = None
    designation: Optional[str] = None
    organization: Optional[str] = None
    contact_number: str
    isd_code: str
    email: Optional[str] = None
    h_no: Optional[str] = None
    street: Optional[str] = None
    locality: Optional[str] = None
    city: Optional[str] = None
    pincode: str
    country: Optional[str] = None
    state: Optional[str] = None
    ref_member_no: Optional[str] = None
    relation_with_sas: Optional[str] = None
    preferred_language: Optional[str] = None
    paid_on: Optional[date] = None
    membership_amount: Optional[float] = None
    membership_category: str
    joining_date: Optional[date] = None
    membership_ends_on: Optional[date] = None
    introduced_by: Optional[str] = None

class MemberCreate(MemberBase):
    pass

class MemberOut(MemberBase):
    id: int
    class Config:
        orm_mode = True

class VendorBase(BaseModel):
    vendor_name: str
    gstin: Optional[str] = None
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    address_3: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None

class VendorCreate(VendorBase):
    pass

class VendorOut(VendorBase):
    id: int
    class Config:
        orm_mode = True

class CustomerBase(BaseModel):
    customer_name: str
    gstin: Optional[str] = None
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    address_3: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerOut(CustomerBase):
    id: int
    class Config:
        orm_mode = True

class ExpenseBase(BaseModel):
    voucher_no: str
    date: date
    payment_mode: str
    gl_head: str
    expense_type: str
    expense_category: str
    narration: Optional[str] = None
    gross_amount: float
    tds: Optional[float] = None
    net_amount: float

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseOut(ExpenseBase):
    id: int
    class Config:
        orm_mode = True

class InventoryItemBase(BaseModel):
    group_name: str
    sub_group: str
    item_type: str
    item_category: str
    item_code: str
    item_name: str
    description: Optional[str] = None
    print_name: Optional[str] = None
    hsn_code: Optional[str] = None
    measure_unit: str
    storage_type: Optional[str] = None
    inventory_val: Optional[str] = None
    stock_maintain: bool = False
    opening_qty: Optional[float] = None
    opening_rate: Optional[float] = None
    opening_value: Optional[float] = None
    min_qty: Optional[float] = None
    max_qty: Optional[float] = None
    reorder_level: Optional[float] = None
    dimension_l: Optional[float] = None
    dimension_w: Optional[float] = None
    dimension_h: Optional[float] = None
    area: Optional[float] = None
    weight: Optional[float] = None

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemOut(InventoryItemBase):
    id: int
    class Config:
        orm_mode = True


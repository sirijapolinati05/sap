import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
from models import InventoryItem

db = SessionLocal()

# Add some dummy items
dummy_items = [
    InventoryItem(
        group_name="Cottage",
        sub_group="Long Sticks",
        item_type="ITEM",
        item_category="Cottage - Long Sticks",
        item_code="STK-001",
        item_name="16\" 5 sticks Jasmine Long Sticks",
        measure_unit="Nos",
        stock_maintain=True,
        opening_qty=42,
        opening_rate=135.00
    ),
    InventoryItem(
        group_name="Cottage",
        sub_group="Long Sticks",
        item_type="ITEM",
        item_category="Cottage - Long Sticks",
        item_code="STK-002",
        item_name="16\" 5 sticks Mattipal Cottage Long Sticks",
        measure_unit="Nos",
        stock_maintain=True,
        opening_qty=17,
        opening_rate=163.00
    ),
    InventoryItem(
        group_name="Books",
        sub_group="English",
        item_type="BOOK",
        item_category="Books",
        item_code="BK-104",
        item_name="A Call to the Youth of India",
        measure_unit="Nos",
        stock_maintain=True,
        opening_qty=28,
        opening_rate=85.00
    ),
    InventoryItem(
        group_name="Books",
        sub_group="English",
        item_type="BOOK",
        item_category="Books",
        item_code="BK-105",
        item_name="A Commentary on Sri Aurobindo's Poem Ilion",
        measure_unit="Nos",
        stock_maintain=True,
        opening_qty=12,
        opening_rate=250.00
    )
]

# Check if they exist
existing = db.query(InventoryItem).count()
if existing == 0:
    for item in dummy_items:
        db.add(item)
    db.commit()
    print("Seeded inventory items.")
else:
    print(f"Inventory already has {existing} items. Skipping seed.")

db.close()

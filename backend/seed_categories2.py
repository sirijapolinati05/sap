from database import engine, SessionLocal, Base
import models
from sqlalchemy import text

# Drop table in postgres
with engine.connect() as con:
    con.execute(text("DROP TABLE IF EXISTS categories;"))
    con.commit()

print("Table dropped")

# Create and seed
Base.metadata.create_all(bind=engine)

db = SessionLocal()
categories_to_seed = [
    "AS - Soaps - 100",
    "AS - Soaps - 75",
    "Agarbatti",
    "Agarbatti-AS - Centenary",
    "Books",
    "Cottage - 10 gms - 9\" Sticks",
    "Cottage - 100 gms - 9\" Sticks",
    "Cottage - 50 gms - 9\" Sticks",
    "Cottage - Amrita - 100x9\" Sticks BP",
    "Cottage - Amrita - 50x9\" Sticks BP",
    "Cottage - Cones - 15",
    "Cottage - Devotion Soaps 75 gms",
    "Cottage - Long Sticks"
]

for cat_name in categories_to_seed:
    db.add(models.Category(name=cat_name, type="Product", status="Active"))
        
db.commit()
db.close()
print("Categories seeded successfully")

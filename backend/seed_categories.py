from database import engine, SessionLocal, Base
import models

# 1. Create table
Base.metadata.create_all(bind=engine)

# 2. Seed data
db = SessionLocal()
categories_to_seed = [
    'AS - Soaps - 100',
    'AS - Soaps - 75',
    'Agarbatti',
    'Agarbatti-AS - Centenary',
    'Books',
    'Cottage - 10 gms - 9" Sticks',
    'Cottage - 100 gms - 9" Sticks',
    'Cottage - 50 gms - 9" Sticks',
    'Cottage - Amrita - 100x9" Sticks BP',
    'Cottage - Amrita - 50x9" Sticks BP',
    'Cottage - Cones - 15',
    'Cottage - Devotion Soaps 75 gms',
    'Cottage - Long Sticks'
]

for cat_name in categories_to_seed:
    existing = db.query(models.Category).filter(models.Category.name == cat_name).first()
    if not existing:
        db.add(models.Category(name=cat_name))
        
db.commit()
db.close()
print('Categories seeded successfully')

import sqlite3
import psycopg2
from psycopg2.extras import DictCursor
import os
from dotenv import load_dotenv

# Load environment variables for PostgreSQL
load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
POSTGRES_DB = os.getenv("POSTGRES_DB", "branch-management")

print(f"Connecting to Postgres database '{POSTGRES_DB}' at {POSTGRES_HOST}...")

try:
    pg_conn = psycopg2.connect(
        dbname=POSTGRES_DB,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_HOST,
        port=POSTGRES_PORT
    )
    pg_cursor = pg_conn.cursor()
except Exception as e:
    print(f"Error connecting to PostgreSQL: {e}")
    exit(1)

print("Connecting to local SQLite database (database.db)...")
try:
    sqlite_conn = sqlite3.connect('database.db')
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cursor = sqlite_conn.cursor()
except Exception as e:
    print(f"Error connecting to SQLite: {e}")
    exit(1)

# Get all tables from SQLite
sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row['name'] for row in sqlite_cursor.fetchall() if row['name'] != 'sqlite_sequence']

for table in tables:
    print(f"\nMigrating table: {table}...")
    
    # Get rows from SQLite
    sqlite_cursor.execute(f"SELECT * FROM {table}")
    rows = sqlite_cursor.fetchall()
    
    if not rows:
        print("  Table is empty, skipping.")
        continue
        
    # Get column names
    columns = rows[0].keys()
    col_names = ', '.join(columns)
    placeholders = ', '.join(['%s'] * len(columns))
    
    insert_query = f"INSERT INTO {table} ({col_names}) VALUES ({placeholders}) ON CONFLICT DO NOTHING"
    
    success_count = 0
    for row in rows:
        try:
            # Convert row to tuple
            values = tuple(row)
            pg_cursor.execute(insert_query, values)
            success_count += 1
        except Exception as e:
            print(f"  Error inserting row into {table}: {e}")
            pg_conn.rollback() # Rollback the failed transaction block
            continue
            
    print(f"  Successfully migrated {success_count}/{len(rows)} rows to {table}.")
    pg_conn.commit()

print("\nMigration completed successfully!")
pg_cursor.close()
pg_conn.close()
sqlite_cursor.close()
sqlite_conn.close()

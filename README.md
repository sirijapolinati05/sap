# SAS Hyderabad Branch Management Application

This is a comprehensive full-stack application designed to manage the daily operations of the SAS Hyderabad Branch. It includes functionalities for managing Members, Visitors, Sales, Purchases, Inventory, Cash Book, and generating Reports.

## Features

- **Authentication**: Secure login system.
- **Dashboard**: High-level overview of branch activities and member growth.
- **Member Management**: Add, view, edit, and track member details including their addresses, contact information, membership categories, and payment history.
- **Visitor Management**: Track daily visitors and their purpose of visit.
- **Inventory & Sales**: Monitor stock levels, handle purchases from vendors, and track sales to customers.
- **Cash Book & Expenses**: Keep an accurate record of daily expenses and financial transactions.

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router DOM
- **Charts**: Recharts

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3
- **Database ORM**: SQLAlchemy
- **Data Validation**: Pydantic
- **Database**: PostgreSQL (via `psycopg2`)
- **Server**: Uvicorn

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- PostgreSQL server (ensure it is running and accessible)

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure the `.env` file (if applicable) with your database credentials.
5. Start the backend server:
   ```bash
   python run.py
   # Or using uvicorn directly:
   uvicorn main:app --reload --port 8000
   ```
   The API will be accessible at `http://localhost:8000`. API documentation is available at `http://localhost:8000/docs`.

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or another port provided by Vite).

## Project Structure

```text
Branch Manage/
├── backend/
│   ├── main.py           # FastAPI application & route definitions
│   ├── models.py         # SQLAlchemy database models
│   ├── schemas.py        # Pydantic validation schemas
│   ├── database.py       # Database connection setup
│   └── run.py            # Script to run the uvicorn server
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components and forms
    │   ├── pages/        # Main application views (Home, Members, etc.)
    │   ├── App.tsx       # Application routing
    │   └── main.tsx      # Entry point
    ├── index.html
    ├── package.json
    └── tailwind.css
```

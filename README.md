# PA FABS Textile ERP System

A comprehensive textile ERP system for PA FABS (Namakkal, Tamil Nadu) with full-stack implementation using FastAPI backend and vanilla JavaScript frontend.

## Features

- **User Management**: Admin and Staff User roles with approval workflow
- **PO Management**: Purchase Order creation with warp/weft specifications
- **Inward/Outward/Return**: Material tracking with cycle-based workflows
- **Loom Allocation**: 18 looms with global locking until delivery
- **Manufacturing**: Daily production logs and tracking
- **Delivery**: DC slip generation with loom auto-unlocking
- **Dashboard**: Real-time statistics and analytics

## Technology Stack

- **Backend**: Python 3.10+, FastAPI, PostgreSQL, SQLAlchemy
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Database**: PostgreSQL with 12 relational tables

## Quick Start

### Prerequisites

1. Python 3.10+ installed
2. PostgreSQL 14+ installed locally
3. Modern web browser

### Database Setup

```bash
# Create PostgreSQL database
createdb pa_fabs
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template and configure
cp .env.example .env
# Edit .env with your database credentials

# Initialize database (creates tables and seeds initial data)
python ../scripts/init_db.py
```

### Run Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

API documentation (Swagger UI): `http://localhost:8000/docs`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Serve frontend (option 1 - Python)
python -m http.server 3000

# Or simply open index.html in your browser
```

Frontend will be available at: `http://localhost:3000`

### Default Credentials

After database initialization, these default accounts are created:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Staff User:**
- Username: `user`
- Password: `user123`

## Project Structure

```
PA_FABS_ERP_V1/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration
│   ├── database.py             # PostgreSQL connection
│   ├── models/                 # SQLAlchemy ORM models
│   ├── schemas/                # Pydantic schemas
│   ├── api/                    # API endpoints
│   ├── services/               # Business logic
│   ├── requirements.txt        # Python dependencies
│   └── .env.example            # Environment template
├── frontend/
│   ├── index.html              # Login page
│   ├── admin.html              # Admin panel
│   ├── user.html               # User panel
│   ├── css/                    # Modular CSS files
│   ├── js/                     # JavaScript modules
│   └── assets/                 # Static assets
├── scripts/
│   └── init_db.py              # Database initialization
└── README.md                   # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Purchase Orders
- `POST /api/pos` - Create PO
- `GET /api/pos` - List POs
- `GET /api/pos/{po_number}` - Get PO details
- `GET /api/pos/{po_number}/yarn` - Get yarn details
- `PUT /api/pos/{po_number}` - Update PO
- `DELETE /api/pos/{po_number}` - Delete PO (admin only)

### Inward Entries
- `POST /api/inwards` - Create inward entry
- `GET /api/inwards` - List inward entries

### Outward Entries
- `POST /api/outwards` - Create outward entry
- `GET /api/outwards` - List outward entries

### Return Entries
- `POST /api/returns` - Create return entry
- `GET /api/returns` - List return entries

### Looms
- `GET /api/looms` - List all looms
- `GET /api/looms/free` - Get free looms
- `POST /api/looms/allocate` - Allocate loom

### Manufacturing
- `POST /api/manufacturing` - Create manufacturing log
- `GET /api/manufacturing` - List manufacturing logs

### Deliveries
- `POST /api/deliveries` - Create delivery
- `GET /api/deliveries` - List deliveries
- `GET /api/deliveries/{id}/dc-slip` - Get DC slip data

### Admin Only
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/{id}/approve` - Approve user
- `PUT /api/admin/users/{id}/reject` - Reject user

## Key Business Rules

1. **Cycle Management**: Each PO can have multiple cycles. A new cycle can only start after the previous cycle's delivery is complete.

2. **Global Loom Lock**: Looms remain occupied until delivery is saved. Only free looms appear in allocation dropdowns.

3. **Beam Generation**: Beams are auto-generated (B001, B002, etc.) when warping return is saved.

4. **Delivery**: One delivery per PO per cycle. On successful delivery save, all associated looms are automatically freed.

5. **User Approval**: New user registrations require admin approval before accessing the system.

## Development Notes

### Frontend Modularization

The frontend is split into:
- **CSS**: 5 modular files (variables, base, layout, components, pages)
- **JavaScript**: Modular ES6+ with API client and domain separation
- **HTML**: Separate files for login, admin panel, and user panel

### Backend Architecture

- **Models**: 12 SQLAlchemy ORM models matching database schema
- **Schemas**: Pydantic models for request/response validation
- **API**: RESTful endpoints organized by domain
- **Services**: Authentication (JWT, bcrypt) and business logic

### Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (Admin/User)
- CORS enabled for frontend-backend communication
- SQL injection prevention through ORM

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/pa_fabs
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `createdb pa_fabs`

### Frontend API Errors
- Ensure backend is running on port 8000
- Check API base URL in `frontend/js/config.js`
- Verify CORS configuration in `backend/main.py`

### Import Errors
- Ensure you're in the project root directory
- Use proper Python path when running init script

## License

Confidential - For PA FABS Management Only

## Contact

PA FABS
Namakkal, Tamil Nadu
GSTIN: 33ERVPM7456N1ZP
Phone: 8220774578
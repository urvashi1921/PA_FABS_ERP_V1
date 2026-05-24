from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine
from backend.models import *
from backend.api import auth, pos, inward, outward, returns, looms, manufacturing, deliveries, admin

app = FastAPI(
    title="PA FABS Textile ERP API",
    description="Full-stack Textile ERP System for PA FABS",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(pos.router)
app.include_router(inward.router)
app.include_router(outward.router)
app.include_router(returns.router)
app.include_router(looms.router)
app.include_router(manufacturing.router)
app.include_router(deliveries.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {
        "message": "PA FABS Textile ERP API",
        "version": "2.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
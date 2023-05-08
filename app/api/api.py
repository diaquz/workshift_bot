from fastapi import APIRouter

from app.api.endpoints import user
from app.api.endpoints import auth
from app.api.endpoints import workshift
from app.api.endpoints import offer

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(workshift.router, prefix="/workshift", tags=["workshift"])
api_router.include_router(offer.router, prefix="/offer", tags=["offer"])

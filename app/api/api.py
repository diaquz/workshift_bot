from fastapi import APIRouter

from app.api.endpoints import user
from app.api.endpoints import workshift

api_router = APIRouter()
api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(workshift.router, prefix="/workshift", tags=["workshift"])

from fastapi import APIRouter

from app.api.endpoints import user
from app.api.endpoints import auth
from app.api.endpoints import event
from app.api.endpoints import offer
from app.api.endpoints import feedback
from app.api.endpoints import telegram

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(event.router, prefix="/event", tags=["event"])
api_router.include_router(offer.router, prefix="/offer", tags=["offer"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])
api_router.include_router(telegram.router, prefix="/telegram", tags=["telegram"])

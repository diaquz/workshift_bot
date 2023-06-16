from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.api import deps
from app import repository

from app.model.user import User
from app import schemas
from app.schemas.user import UserList

router = APIRouter()


def entry_point(
    data: dict,
    db: Session = Depends(deps.get_db)
):
    id = 0
    user = repository.user.get_by_telegram(db, id)

    if user:
        pass

    pass
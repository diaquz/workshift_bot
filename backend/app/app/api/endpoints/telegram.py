from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.api import deps
from app import repository

from app.model.user import User
from app import schemas
from app.schemas.user import UserList

from app.telegram.resolver import resolver

router = APIRouter()

@router.post('', status_code=status.HTTP_200_OK)
async def entry_point(
    update: dict,
    db: Session = Depends(deps.get_db)
):
    try:
        await resolver.resolve(db, update)
    except:
        pass
            

    
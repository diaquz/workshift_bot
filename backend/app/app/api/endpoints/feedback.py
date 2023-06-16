from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from datetime import datetime, timedelta

from app.api import deps
from app.schemas.event import EventList, EventDetailList
from app.model.event import EventType
from app import schemas
from app import repository

from app.model.user import User

router = APIRouter()


@router.get("/")
def fetch_feedback(
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
) -> dict:

    if repository.user.hasPermission(user):
        feedback = repository.feedback.get_many(db)

        return {
            "result": feedback
        }
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

@router.post("/create")
def create_feedback(
    data: schemas.FeedbackCreate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    data.user_id = user.id
    feedback =  repository.feedback.create(db, obj_in=data)

    if feedback is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Не удалось создать")
    
    return feedback


@router.post("/delete")
def create_feedback(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):

    feedback = repository.feedback.remove(db, id = id)
    if feedback is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Не удалось удалить")
    
    return {
        "result": feedback
    }

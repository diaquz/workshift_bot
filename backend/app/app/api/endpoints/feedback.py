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

@router.post("/done")
def feedback_done(
    id: int,
    message: Optional[str],
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user):

        return repository.feedback.remove(db, id=id)

    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


@router.post("/work")
def feedback_in_work(
    id: int,
    message: Optional[str],
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user):
        feedback = repository.feedback.get(db, id=id)
        if feedback:

            return repository.feedback.in_work(db, feedback)
        
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

@router.post("/decline")
def decline_feedback(
    id: int,
    message: Optional[str],
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    feedback = repository.feedback.get(db, id)
    if feedback and repository.user.hasPermission(user): #type: ignore
        return repository.feedback.remove(db, id=id)
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


@router.post("/delete")
def delete_feedback(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    feedback = repository.feedback.get(db, id)
    if feedback and feedback.user_id == user.id: #type: ignore
        return repository.feedback.remove(db, id=id)
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

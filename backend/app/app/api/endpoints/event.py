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


@router.get("/", status_code=200, response_model=EventList)
def fetch_user_events(
    timestamp: float = datetime.utcnow().timestamp(),
    days: Optional[int] = 7,
    workshift: bool = False,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
) -> dict:
    date = datetime.fromtimestamp(timestamp)
    end = date + timedelta(days=days) # type: ignore

    if workshift:
        events = repository.event.get_by_date_and_type(db, user.id, date, end, type=EventType.Workshift)
    else:
        events = repository.event.get_for_user(db, id=user.id, start_date=date, end_date=end)

    return {'result': list(events) }

@router.get('/events', status_code=200, response_model=EventDetailList)
def fetch_events(
    timestamp: float = datetime.utcnow().timestamp(),
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    date = datetime.fromtimestamp(timestamp)
    end = date + timedelta(days=1)

    if repository.user.hasPermission(user): # type: ignore
        event = repository.event.get_by_date(db, date, end)

        return {
            'result': list(event)
        }

    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Has no persmissons")


@router.post("/create", status_code=status.HTTP_200_OK, response_model=schemas.Event)
def create_event(
    data: schemas.EventCreate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user): # type: ignore
        event = repository.event.create(db, obj_in=data)

        return event

    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

@router.post("/edit", status_code=status.HTTP_200_OK, response_model=schemas.Event)
def edit_event(
    data: schemas.event.EventUpdate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user): # type: ignore
        event = repository.event.get(db, id=data.id)
 
        if event:
            new_event = repository.event.update(db, db_obj=event, obj_in=data)
            return new_event
        
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

@router.delete("/delete", status_code=status.HTTP_200_OK)
def delete_event(
    event_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user): # type: ignore
        event = repository.event.get(db, id=event_id)
 
        if event:
            deleted_event = repository.event.remove(db, id=event_id)
            return deleted_event
        
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from datetime import datetime, timedelta

from app.api import deps
from app.schemas.workshift import WorkshiftList
from app import schemas
from app import repository

from app.model.user import User

router = APIRouter()


@router.get("/", status_code=200, response_model=WorkshiftList)
def fetch_user_workshifts(
    timestamp: float = datetime.utcnow().timestamp(),
    days: Optional[int] = 7,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
) -> dict:
    date = datetime.fromtimestamp(timestamp)
    end = date + timedelta(days=days) # type: ignore

    # workshifts = db.query(Workshift).filter(Workshift.start_time >= date).limit(limit).all()
    workshifts = repository.workshift.get_for_user(db, user, date, end)

    return {'result': list(workshifts) }


@router.post("/create", status_code=status.HTTP_200_OK)
def create_workshift(
    data: schemas.WorkshiftCreate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("/edit", status_code=status.HTTP_200_OK)
def edit_workshift(
    data: schemas.WorkshiftCreate, #TODO replace to WorkshiftUpdate
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.delete("/delete", status_code=status.HTTP_200_OK)
def delete_workshift(
    workshift_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

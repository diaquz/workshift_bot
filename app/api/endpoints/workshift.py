from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Any, Optional

from datetime import datetime, timedelta

from app.api import deps
from app.model.workshift import Workshift
from app.schemas.workshift import WorkshiftList

import logging

router = APIRouter()

@router.get('/time')
def fetch_time():
    return { 'time': datetime.utcnow() }

@router.get("/", status_code=200, response_model=WorkshiftList)
def fetch_workshifts(
    timestamp: float = datetime.utcnow().timestamp(),
    days: Optional[int] = 7,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    date = datetime.fromtimestamp(timestamp)

    end = date + timedelta(days=days or 7)
    workshifts = db.query(Workshift).filter(Workshift.start_time >= date).limit(limit).all()

    return {'result': list(workshifts) }

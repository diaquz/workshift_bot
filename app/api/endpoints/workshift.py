from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Any, Optional

from datetime import datetime, timedelta

from app.api import deps
from app.model.workshift import Workshift

import logging

router = APIRouter()

@router.get("/{date}")
def fetch_workshifts(
    date: datetime = datetime.utcnow(),
    days: Optional[int] = 7,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
):
    logging.debug(f'/workshift/{date}')

    end = date + timedelta(days=days or 10)
    workshifts = db.query(Workshift).filter(Workshift.start_time >= date and Workshift.start_time <= end).limit(limit).all()


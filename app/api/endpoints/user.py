from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.api import deps

router = APIRouter()

@router.post("login")
def login(*,
    db: Session = Depends(deps.get_db)
):
    pass


def register():
    pass



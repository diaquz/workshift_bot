from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.api import deps

from app.model.user import User, Qualification
from app.schemas.offer import OffersDetailsList
from app import schemas

from app import repository

import logging

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=OffersDetailsList)
def fetch_offers(
    offset: Optional[int] = 0,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    #TODO: fetch by level 
    offers = repository.offer.get_by_level(db, level=Qualification.Master, offset=offset, limit=limit) # type: ignore
    
    return { 'result': list(offers) }


@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=schemas.Offer)
def create_offer(
    data: schemas.OfferCreate,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    offer = repository.offer.get_by_workshift(db, data.workshift_id)
    if offer:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Already existing')
    
    new_offer = repository.offer.create(db, obj_in=data)

    return new_offer

@router.post("/anser/create", status_code=status.HTTP_201_CREATED)
def answer_on_offer():
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post("answer/accept", status_code=status.HTTP_201_CREATED)
def accept_answer():
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)
    
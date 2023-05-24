from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.api import deps

from app.model.user import User, Qualification
from app.model.event import EventType
from app.schemas.offer import OffersDetailsList, OfferWithAnswersList
from app import schemas

from app import repository

import logging

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=OffersDetailsList)
def fetch_offers(
    offset: Optional[int] = 0,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
) -> dict:
    offers = repository.offer.get_by_level(db, level=user.level, id=user.id, offset=offset, limit=limit) # type: ignore
    
    return { 'result': list(offers) }

@router.get('/mine', status_code=status.HTTP_200_OK)#, response_model=OfferWithAnswersList)
def fetch_user_offers(
    db: Session = Depends(deps.get_db),
    # user: User = Depends(deps.get_user)
):
    offers = repository.offer.get_user_offers(db, id=1) #type: ignore

    return {
        'result': list(offers)
    }


@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=schemas.Offer)
def create_offer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    offer = repository.offer.get_by_workshift(db, id)
    event = repository.event.get(db, id=id)

    if offer:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Already existing')
    
    if event is None or event.type != EventType.Workshift: # type: ignore
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Can't create offer")
    
    obj_in = schemas.OfferCreate(workshift_id=id, publisher_id=user.id) #type: ignore
    new_offer = repository.offer.create(db, obj_in=obj_in)

    return new_offer

@router.post("/delete", status_code=status.HTTP_200_OK, response_model=schemas.Offer)
def delete_offer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    offer = repository.offer.get(db, id = id)
    if offer and offer.publisher_id == user.id: # type: ignore
        deleted_offer = repository.offer.remove(db, id=id)

        return deleted_offer
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

@router.post("/answer/create", status_code=status.HTTP_200_OK)
def answer_on_offer(
    offer_id: int,
    event_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    offer = repository.offer.get(db, id=offer_id)
    event = repository.event.get(db, id=event_id)

    if offer and event and event.type == EventType.Workshift: # type: ignore
        obj_in = schemas.AnswerCreate(
            offer_id=offer_id,
            workshift_id=event_id,
            user_id=user.id #type: ignore
        )

        answer = repository.answer.create(db, obj_in=obj_in)

        return answer

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


@router.post("answer/accept", status_code=status.HTTP_200_OK)
def accept_answer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    answer = repository.answer.accept(db, id=id)
    if answer:
        return answer
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
@router.post("answer/delete", status_code=status.HTTP_200_OK)
def delete_answer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    answer = repository.answer.remove(db, id=id)
    if answer:
        return answer

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any, Optional

from app.api import deps

from app.model.user import User, Qualification
from app.model.event import EventType
from app.schemas.offer import OffersDetailsList, OfferWithAnswersList
from app import schemas
from app.schemas.answer import AnswerDetailList

from app import repository
from datetime import datetime, timedelta

import logging

router = APIRouter()

@router.get('/', status_code=status.HTTP_200_OK, response_model=OffersDetailsList)
def fetch_offers(
    date: float = datetime.utcnow().timestamp(),
    offset: Optional[int] = 0,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
) -> dict:
    min_date = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)
    start_date = max(datetime.fromtimestamp(date), min_date)
    offers = repository.offer.get_by_level(db, date=start_date, level=user.level, id=user.id, offset=offset, limit=limit) # type: ignore
    
    return { 'result': list(offers) }

@router.get('/mine', status_code=status.HTTP_200_OK)#, response_model=OfferWithAnswersList)
def fetch_user_offers(
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    offers = repository.offer.get_user_offers(db, id=user.id) #type: ignore

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

    if offer is not None:
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
    answer = repository.answer.get_by_event_and_offer(db, event_id, offer_id)

    if answer:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Already existing')

    if offer and event and event.type == EventType.Workshift and event.user_id == user.id: # type: ignore
        obj_in = schemas.AnswerCreate(
            offer_id=offer_id,
            workshift_id=event_id,
            user_id=user.id #type: ignore
        )

        answer = repository.answer.create(db, obj_in=obj_in)

        return answer

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)


@router.post("/answer/accept", status_code=status.HTTP_200_OK)
def accept_answer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    answer = repository.answer.get(db, id=id)
    #TODO now any random user can accept om,ther's answers
    answer = repository.answer.accept(db, id=id)

    if answer:
        return "success"
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    
@router.post("/answer/delete", status_code=status.HTTP_200_OK)
def delete_answer(
    id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    answer = repository.answer.remove(db, id=id)
    if answer:
        return answer

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

@router.get("/answer/me", status_code=status.HTTP_200_OK)
def fethc_user_answers(
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    answers = repository.answer.get_user_answers(db, user.id) #type: ignore

    return {
        "result": list(answers)
    }

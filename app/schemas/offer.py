from pydantic import BaseModel
from typing import Optional, Sequence
from app.schemas import User, Event
from app.schemas.answer import AnswerDetail

class OfferBase(BaseModel):
    workshift_id: int
    publisher_id: int

class OfferCreate(OfferBase):
    ...

class OfferUpdate(OfferBase):
    ...

class OfferInDbBase(OfferBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

class Offer(OfferInDbBase):
    pass

class OfferDetails(Offer):
    user: User
    workshift: Event

class OffersDetailsList(BaseModel):
    result: Sequence[OfferDetails]
    
class OfferWithAnswers(Offer):
    answers: Sequence[AnswerDetail]

class OfferWithAnswersList(BaseModel):
    result: Sequence[OfferWithAnswers]
    
from pydantic import BaseModel
from typing import Optional, Sequence
from app.schemas import User, Workshift

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
    workshift: Workshift

class OffersDetailsList(BaseModel):
    result: Sequence[OfferDetails]
    
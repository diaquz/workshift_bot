from sqlalchemy.orm import Session, selectinload, contains_eager
from sqlalchemy.sql import select

from app.repository.base import BaseRepository
from app.model.offer import Offer
from app.schemas.offer import OfferCreate, OfferUpdate

from app.model.user import User, Qualification
from app.model.workshift import Workshift


class OfferRepository(BaseRepository[Offer, OfferCreate, OfferUpdate]):
    def get_by_level(self, db: Session, level: Qualification, offset: int = 0, limit: int = 10):

        return db.query(Offer)\
            .join(Workshift)\
            .join(User)\
            .options(contains_eager(Offer.workshift), contains_eager(Offer.user))\
            .where(User.level == level)\
            .offset(offset).limit(limit).all()

    def get_by_workshift(self, db: Session, id: int):
        return db.query(Offer).filter(Offer.workshift_id == id).first()
    
offer = OfferRepository(Offer)

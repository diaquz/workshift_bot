from sqlalchemy.orm import Session, selectinload, contains_eager, joinedload
from sqlalchemy.sql import select

from app.repository.base import BaseRepository
from app.model.offer import Offer
from app.schemas.offer import OfferCreate, OfferUpdate

from app.model.user import User, Qualification
from app.model.event import Event
from app.model.offer_answer import Answer
from datetime import datetime


class OfferRepository(BaseRepository[Offer, OfferCreate, OfferUpdate]):
    def get_by_level(self, db: Session, date: datetime, level: Qualification, id: int, offset: int = 0, limit: int = 10):

        return db.query(Offer)\
            .join(Event).join(User)\
            .options(contains_eager(Offer.workshift), contains_eager(Offer.user))\
            .where((User.level == level) & (User.id != id) & (Event.start_time >= date))\
            .offset(offset).limit(limit).all()

    def get_user_offers(self, db: Session, id: int):
        return db.query(Offer)\
            .join(Event)\
            .options(joinedload(Offer.answers).joinedload(Answer.workshift), contains_eager(Offer.workshift))\
            .where(Offer.publisher_id == id)\
            .order_by(Event.start_time)\
            .all()

    def get_by_workshift(self, db: Session, id: int):
        return db.query(Offer).filter(Offer.workshift_id == id).first()
    
    
    
offer = OfferRepository(Offer)

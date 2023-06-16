from sqlalchemy.orm import Session, joinedload, contains_eager

from app.repository.base import BaseRepository
from app.model.offer_answer import Answer
from app.model.offer import Offer
from app.schemas.answer import AnswerCreate, AnswerUpdate
from app.schemas.event import EventUpdate, Event
from app import repository


class AnswerRepository(BaseRepository[Answer, AnswerCreate, AnswerUpdate]):
    def get_user_answers(self, db: Session, id: int):
        return db.query(Answer)\
            .options(joinedload(Answer.workshift), joinedload(Answer.offer).joinedload(Offer.workshift))\
            .where(Answer.user_id == id)\
            .all()
        
    def accept(self, db: Session, id: int):
        answer = db.query(Answer)\
            .where(Answer.id == id)\
            .options(joinedload(Answer.offer).joinedload(Offer.workshift), joinedload(Answer.workshift))\
            .first()

        if answer and answer.offer and answer.workshift and answer.offer.workshift:
            first_upd = { 'user_id': answer.offer.publisher_id }
            second_upd = { 'user_id': answer.workshift.user_id }

            repository.event.update(db, db_obj=answer.workshift, obj_in=first_upd)
            repository.event.update(db, db_obj=answer.offer.workshift, obj_in=second_upd)

            deleted_offer = repository.offer.remove(db, id=answer.offer.id)
            deleted_answer = repository.answer.remove(db, id=answer.id)
        
        return answer

    def get_answer_to_user(self, db: Session, id: int):

        return db.query(Answer)\
            .join(Event)\
            .where(Offer.publisher_id == id)\
            .options(contains_eager(Answer.offer).joinedload(Offer.workshift))\
            .all()

    def get_by_event_and_offer(self, db: Session, event_id: int, offer_id: int):

        return db.query(Answer)\
            .where((Answer.offer_id == offer_id) & (Answer.workshift_id == event_id))\
            .first()
    
answer = AnswerRepository(Answer)

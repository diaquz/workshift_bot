from sqlalchemy.orm import Session, joinedload

from app.repository.base import BaseRepository
from app.model.offer_answer import Answer
from app.model.offer import Offer
from app.schemas.answer import AnswerCreate, AnswerUpdate
from app.schemas.event import EventUpdate
from app import repository


class AnswerRepository(BaseRepository[Answer, AnswerCreate, AnswerUpdate]):
    def get_user_answers(self, db: Session, id: int):
        return db.query(Answer)\
            .options(joinedload(Answer.workshift), joinedload(Answer.offer).joinedload(Offer.workshift))\
            .all()
        
    def accept(self, db: Session, id: int):
        answer = db.query(Answer).options(joinedload(Answer.offer).joinedload(Offer.workshift), joinedload(Answer.workshift)).first()
        if answer and answer.offer and answer.workshift and answer.offer.workshift:
            first = EventUpdate.from_orm(answer.workshift)
            first.user_id = answer.offer.publisher_id

            second = EventUpdate.from_orm(answer.offer.workshift)
            second.user_id = answer.workshift.user_id

            repository.offer.remove(db, id=answer.offer.id)

            repository.event.update(db, db_obj=answer.workshift, obj_in=first)
            repository.event.update(db, db_obj=answer.offer.workshift, obj_in=second)
        
        return answer

    
answer = AnswerRepository(Answer)

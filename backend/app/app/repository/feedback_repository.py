from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from app.repository.base import BaseRepository
from app.model.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate


class FeedbackRepository(BaseRepository[Feedback, FeedbackCreate, FeedbackUpdate]):
    def get_all(self, db: Session):
        return db.query(Feedback).options(joinedload(Feedback.user)).all()

    def get_by_user(self, db: Session, id: int):
        return db.query(Feedback).filter(Feedback.user_id == id).all()
    
    def get_by_timetamp(self, db: Session, timestamp: float):
        return db.query(Feedback).where(Feedback.timestamp >= timestamp).options(joinedload(Feedback.user)).all()
    
    def in_work(self, db: Session, feedback):
        update = { 'in_work': True }

        return self.update(db, db_obj=feedback, obj_in=update)
    
    
feedback = FeedbackRepository(Feedback)

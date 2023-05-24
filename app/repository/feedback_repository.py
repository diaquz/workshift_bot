from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.repository.base import BaseRepository
from app.model.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, FeedbackUpdate


class FeedbackRepository(BaseRepository[Feedback, FeedbackCreate, FeedbackUpdate]):
    def get_by_user(self, db: Session, id: int):
        return db.query(Feedback).filter(Feedback.user_id == id).all()
    
    
feedback = FeedbackRepository(Feedback)

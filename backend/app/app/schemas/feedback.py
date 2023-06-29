from pydantic import BaseModel
from typing import Optional, Sequence
from datetime import datetime

from app.schemas import User

class FeedbackBase(BaseModel):
    user_id: int

    title: str
    message: str
    in_work: bool


class FeedbackCreate(FeedbackBase):
    ...

class FeedbackUpdate(FeedbackBase):
    ...

class FeedbackInDbBase(FeedbackBase):
    id: Optional[int]

    class Config:
        orm_mode = True

class Feedback(FeedbackInDbBase):
    ...

class FeedbackDetail(Feedback):
    user: User

class FeedbackList(BaseModel):
    result: Sequence[FeedbackDetail]
    

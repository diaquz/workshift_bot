from pydantic import BaseModel
from typing import Optional, Sequence
from app.schemas import User

class AnswerBase(BaseModel):
    offer_id: int
    workshift_id: int
    user_id: int

class AnswerCreate(AnswerBase):
    ...

class AnswerUpdate(AnswerBase):
    ...

class AnswerInDbBase(AnswerBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

class Answer(AnswerInDbBase):
    pass

class AnswerDetail(Answer):
    user: User

class AnswerDetailList(BaseModel):
    result: Sequence[AnswerDetail]

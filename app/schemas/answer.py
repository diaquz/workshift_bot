from pydantic import BaseModel
from typing import Optional
from app.model.user import Qualification, PrivilegeLevel

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

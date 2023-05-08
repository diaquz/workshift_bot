from pydantic import BaseModel
from typing import Optional

from app.model.user import Qualification

class RequestBase(BaseModel):
    name: str
    telegram_id: int
    level: Qualification

class RequestCreate(RequestBase):
    ...

class RequestUpdate(RequestBase):
    ...

class RequestInDbBase(RequestBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

class Request(RequestInDbBase):
    pass

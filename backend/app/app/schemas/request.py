from pydantic import BaseModel
from typing import Optional

from app.model.user import Qualification
from app.schemas.telegram import TelegramAuthRequest

class RequestBase(BaseModel):
    name: str
    telegram_id: int
    picture: Optional[str]
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

class RequestList(BaseModel):
    result: list[Request]
    

class SiteRequest(BaseModel):
    request: RequestCreate
    token: TelegramAuthRequest
    
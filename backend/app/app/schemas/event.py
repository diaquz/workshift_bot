from pydantic import BaseModel
from typing import Optional, Sequence
from datetime import datetime

from app.model.event import EventType
from app.schemas import User

class EventBase(BaseModel):
    user_id: int

    title: str
    start_time: datetime
    end_time: datetime

    type: EventType
    notify: bool

class EventCreate(EventBase):
    ...

class EventUpdate(EventBase):
    id: int
    ...

class EventInDbBase(EventBase):
    id: Optional[int]

    class Config:
        orm_mode = True

class Event(EventInDbBase):
    ...

class EventDetail(Event):
    user: User

class EventList(BaseModel):
    result: Sequence[Event]
    

class EventDetailList(BaseModel):
    result: Sequence[EventDetail]
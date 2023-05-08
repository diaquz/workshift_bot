from pydantic import BaseModel
from typing import Optional, Sequence

from datetime import datetime

class WorkshiftBase(BaseModel):
    user_id: int
    start_time: datetime
    duration: int

class WorkshiftCreate(WorkshiftBase):
    ...

class WorkshiftUpdate(WorkshiftBase):
    ...

class WorkshiftInDbBase(WorkshiftBase):
    id: Optional[int]

    class Config:
        orm_mode = True

class Workshift(WorkshiftInDbBase):
    ...

class WorkshiftList(BaseModel):
    result: Sequence[Workshift]
    
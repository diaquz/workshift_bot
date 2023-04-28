from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.repository.base import BaseRepository
from app.model.workshift import Workshift
from app.schemas.workshift import WorkshiftCreate, WorkshiftUpdate


class WorkshiftRepository(BaseRepository[Workshift, WorkshiftCreate, WorkshiftUpdate]):
    ...

workshift = WorkshiftRepository(Workshift)

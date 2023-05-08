from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.repository.base import BaseRepository
from app.model.offer_answer import Answer
from app.schemas.answer import AnswerCreate, AnswerUpdate


class AnswerRepository(BaseRepository[Answer, AnswerCreate, AnswerUpdate]):
    ...
    
answer = AnswerRepository(Answer)

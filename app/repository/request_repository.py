from sqlalchemy.orm import Session
from typing import Any

from app.repository.base import BaseRepository
from app.schemas.request import RequestCreate, RequestUpdate

from app.model.request import RegistrationRequest


class RequestRepository(BaseRepository[RegistrationRequest, RequestCreate, RequestUpdate]):
    def get_by_telegram(self, db: Session, id: Any):
        return db.query(RegistrationRequest).filter(RegistrationRequest.telegram_id == id).first()

request = RequestRepository(RegistrationRequest)

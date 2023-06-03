from sqlalchemy.orm import Session, contains_eager

from app.repository.base import BaseRepository
from app.model.event import Event, EventType
from app.schemas.event import EventCreate, EventUpdate

from datetime import datetime, timedelta
from app.model.user import User

class EventRepository(BaseRepository[Event, EventCreate, EventUpdate]):
    def get_by_date(self, db: Session, start_date: datetime, end_date: datetime):
        return db.query(Event)\
            .filter((Event.end_time >= start_date) & (Event.start_time <= end_date))\
            .join(User)\
            .options(contains_eager(Event.user))\
            .order_by(Event.user_id)\
            .all()
    

    def get_by_date_and_type(self, db: Session, id: int, start_date: datetime, end_date: datetime, type: EventType):
        return db.query(Event)\
            .filter((Event.type == type) & (Event.end_time >= start_date) & (Event.start_time <= end_date) & (Event.user_id == id))\
            .join(User)\
            .options(contains_eager(Event.user))\
            .order_by(Event.user_id)\
            .all()
    

    def get_for_user(self, db: Session, id: int, start_date: datetime, end_date: datetime):
        return db.query(Event)\
            .where((Event.end_time >= start_date) & (Event.start_time <= end_date) & (Event.user_id == id))\
            .order_by(Event.start_time)\
            .all()
        #TODO filter by user id

event = EventRepository(Event)

from sqlalchemy.orm import Session

from app.repository.base import BaseRepository
from app.model.workshift import Workshift
from app.schemas.workshift import WorkshiftCreate, WorkshiftUpdate

from datetime import datetime, timedelta
from app.model.user import User

class WorkshiftRepository(BaseRepository[Workshift, WorkshiftCreate, WorkshiftUpdate]):
    def get_by_date(self, db: Session, start_date: datetime, end_date: datetime, limit: int = 10):
        return db.query(Workshift).filter((Workshift.start_time >= start_date) & (Workshift.start_time <= end_date))
    # .limit(limit).all()

    def get_for_user(self, db: Session, user: User, start_date: datetime, end_date: datetime):
        return db.query(Workshift)\
            .where((Workshift.start_time >= start_date) & (Workshift.start_time <= end_date))\
            .order_by(Workshift.start_time)\
            .all()
        #TODO filter by user id

workshift = WorkshiftRepository(Workshift)

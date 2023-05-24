from sqlalchemy.orm import Session
from app import schemas
from app.model.user import Qualification, PrivilegeLevel
from app.model.event import EventType

from datetime import datetime, timedelta
from app import repository

def init_db(session: Session):
    user_in = schemas.UserCreate(
        telegram_id=380607936,
        name='Евгений Черкасов',
        level=Qualification.Master,
        privilage=PrivilegeLevel.Admin,
        picture='https://t.me/i/userpic/320/_5CRzPHr0LcMkhvA2-Vj2-Pxxg0IXI2Kt6E-WzrxEZ8.jpg'
    )
    
    user_ = repository.user.create(session, obj_in=user_in)
    user = schemas.User.from_orm(user_)

    for day in range(1, 31):
        time = datetime(year=2023, month=5,day=day, hour=8),
        workshift_in = schemas.EventCreate(
            user_id=user.id or 0,
            start_time=datetime(year=2023, month=5,day=day, hour=8),
            end_time=datetime(year=2023, month=5,day=day, hour=17),
            type=EventType.Workshift,
            notify=False
        )

        workshift_ = repository.event.create(session, obj_in=workshift_in)
        workshift = schemas.Event.from_orm(workshift_)

        offer_in = schemas.OfferCreate(
            workshift_id=workshift.id or 0,
            publisher_id=user.id or 0
        )

        offer_ = repository.offer.create(session, obj_in=offer_in)




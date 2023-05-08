from sqlalchemy.orm import Session
from app import schemas
from app.model.user import Qualification, PrivilegeLevel

from datetime import datetime
from app import repository

def init_db(session: Session):
    user_in = schemas.UserCreate(
        telegram_id=123,
        name='Евгений Черкасов',
        level=Qualification.Master,
        privilage=PrivilegeLevel.Admin,
        picture=None
    )
    
    user_ = repository.user.create(session, obj_in=user_in)
    user = schemas.User.from_orm(user_)

    for day in range(1, 31):
        workshift_in = schemas.WorkshiftCreate(
            user_id=user.id or 0,
            start_time=datetime(year=2023, month=4,day=day, hour=8),
            duration=8
        )

        workshift_ = repository.workshift.create(session, obj_in=workshift_in)
        workshift = schemas.Workshift.from_orm(workshift_)

        offer_in = schemas.OfferCreate(
            workshift_id=workshift.id or 0,
            publisher_id=user.id or 0
        )

        offer_ = repository.offer.create(session, obj_in=offer_in)




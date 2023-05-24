from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base

from enum import IntEnum

class EventType(IntEnum):
    Workshift = 0
    Illness = 1
    Another = 2


class Event(Base):
    __tablename__ = 'event'

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    user = relationship("User", back_populates="workshifts")

    start_time = Column(DateTime, index=True, default=datetime.utcnow, nullable=False)
    end_time = Column(DateTime, index=True, default=datetime.utcnow, nullable=False)
    type = Column(Enum(EventType), nullable=False)

    notify = Column(Boolean, default=False, nullable=False)
    # duration = Column(Integer, nullable=False) #maybe timedelta or smt

    offer = relationship("Offer", back_populates="workshift", cascade="all, delete")

from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base

class Workshift(Base):
    __tablename__ = 'workshift'

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="workshifts")

    start_time = Column(DateTime, index=True, default=datetime.utcnow, nullable=False)
    duration = Column(Integer, nullable=False) #maybe timedelta or smt

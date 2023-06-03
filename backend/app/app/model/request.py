from sqlalchemy import Column, Integer, String, Enum, Float
from sqlalchemy.orm import relationship

from app.model.user import Qualification 
from app.db.base import Base
from datetime import datetime

class RegistrationRequest(Base):
    __tablename__ = 'request'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, nullable=False)
    name = Column(String(256), nullable=False)
    picture = Column(String(256), nullable=True)
    # username = Column(String(256), nullable=False)
    timestamp = Column(Float, default=datetime.utcnow().timestamp())

    level = Column(Enum(Qualification), nullable=False)

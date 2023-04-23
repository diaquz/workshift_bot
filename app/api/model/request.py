from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.api.model.user import Qualification 
from app.api.db.base import Base

class Request(Base):
    __tablename__ = 'request'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, nullable=False)
    name = Column(String(256), nullable=False)

    level = Column(Enum(Qualification), nullable=False)
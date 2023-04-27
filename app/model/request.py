from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from app.model.user import Qualification 
from app.db.base import Base

class RegistrationRequest(Base):
    __tablename__ = 'request'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, nullable=False)
    name = Column(String(256), nullable=False)
    # username = Column(String(256), nullable=False)

    level = Column(Enum(Qualification), nullable=False)

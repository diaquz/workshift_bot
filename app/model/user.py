from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base

from enum import IntEnum

class PrivilegeLevel(IntEnum):
    User = 0
    Moderator = 1
    Admin = 2

class Qualification(IntEnum):
    Easy = 0
    Medium = 1
    Master = 2


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, nullable=True)
    name = Column(String(256), nullable=False)

    level = Column(Enum(Qualification), nullable=False)
    privilage = Column(Enum(PrivilegeLevel), nullable=False)
    workshifts = relationship("Workshift", cascade="all,delete-orphan", back_populates="user", uselist=True)
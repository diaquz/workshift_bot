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
    Hard = 2
    Master = 3


def to_qualification(value):
    try:
        return Qualification(value)
    except Exception as e:
        return Qualification.Easy

# class Permission(IntEnum):


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(Integer, nullable=True)
    name = Column(String(256), nullable=False)
    picture = Column(String(256), nullable=True)

    level = Column(Enum(Qualification), nullable=False)
    privilage = Column(Enum(PrivilegeLevel), nullable=False)

    workshifts = relationship("Event", cascade="all,delete", back_populates="user", uselist=True)
    offers = relationship("Offer", cascade="all,delete", back_populates="user", uselist=True)
    answers = relationship("Answer", cascade="all,delete", back_populates="user", uselist=True)
    feedbacks = relationship("Feedback", cascade="all,delete", back_populates="user", uselist=True)

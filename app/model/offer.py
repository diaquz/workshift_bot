from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base

class Offer(Base):
    __tablename__ = 'workshift'

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    workshift_id = Column(Integer, nullable=False)
    publisher_id = Column(Integer, nullable=False)

    
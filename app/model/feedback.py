from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base

from datetime import datetime


class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(256), nullable=False)
    message = Column(String(256), nullable=False)


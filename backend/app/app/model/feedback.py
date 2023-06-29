from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Boolean, Float
from sqlalchemy.orm import relationship
from app.db.base import Base

from datetime import datetime


class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(256), nullable=False)
    message = Column(String(256), nullable=False)
    in_work = Column(Boolean, nullable=False)

    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    user = relationship("User", back_populates="feedbacks")

    timestamp = Column(Float, default=datetime.utcnow().timestamp())

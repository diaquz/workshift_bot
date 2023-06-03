from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base

class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True, index=True, nullable=False)

    offer_id = Column(Integer, ForeignKey("offer.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    workshift_id = Column(Integer, ForeignKey("event.id", ondelete="CASCADE"), nullable=False)
    timestamp = Column(Float, default=datetime.utcnow().timestamp())

    offer = relationship("Offer", back_populates="answers")
    user = relationship("User", back_populates="answers")
    workshift = relationship("Event")

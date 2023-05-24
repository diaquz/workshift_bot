from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base

class Answer(Base):
    __tablename__ = 'answer'

    id = Column(Integer, primary_key=True, index=True, nullable=False)

    offer_id = Column(Integer, ForeignKey("offer.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    workshift_id = Column(Integer, ForeignKey("event.id"), nullable=False)

    offer = relationship("Offer", back_populates="answers")
    user = relationship("User", back_populates="answers")
    workshift = relationship("Event")

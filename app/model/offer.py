from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base import Base

class Offer(Base):
    __tablename__ = 'offer'

    id = Column(Integer, primary_key=True, index=True, nullable=False)

    workshift_id = Column(Integer, ForeignKey("event.id", ondelete="CASCADE"), nullable=False)
    publisher_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)

    workshift = relationship("Event", back_populates="offer")
    user = relationship("User", back_populates="offers")

    answers = relationship("Answer", cascade="all,delete", back_populates="offer", uselist=True)
    
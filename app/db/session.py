from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from config import SQLALCHEMY_DATABASE_URI

engine = create_engine(
    SQLALCHEMY_DATABASE_URI,
    connect_args={ "check_same_thread": False }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

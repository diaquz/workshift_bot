from typing import Generator, Optional, Any
from sqlalchemy.orm import Session

from jose import jwt, JWTError

from fastapi import Depends, HTTPException, status
from app.model.user import User
from app import repository

from app.core.auth import oauth2_scheme
from app.core.config import settings

from app.db.session import SessionLocal


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> User:
    
    payload = decode_token(token)

    user_id = payload.get("sub")
    
    if user_id is None:
        raise credentials_exception()

    user = repository.user.get(db, user_id) # type: ignore

    if user is None:
        raise credentials_exception()
    
    return user


def decode_token(token: str) -> dict[str, Any]:
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.ALGORIHM],
            options={"verify_aud": False}
        )

        return payload

    except JWTError:
        raise credentials_exception()


def credentials_exception():
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.repository.base import BaseRepository
from app.model.user import User, PrivilegeLevel
from app.schemas.user import UserCreate, UserUpdate


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def get_by_telegram(self, db: Session, id: int) -> Optional[User]:
        return db.query(User).filter(User.telegram_id == id).first()
    
    def hasPermission(self, user: User) -> bool:
        return user.privilage >= PrivilegeLevel.Moderator #type: ignore
    
    def get_admins(self, db: Session):
        return db.query(User).where(User.level > PrivilegeLevel.User).all()
    
user = UserRepository(User)

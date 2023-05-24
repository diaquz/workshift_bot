from pydantic import BaseModel
from typing import Optional, Sequence
from app.model.user import Qualification, PrivilegeLevel

class UserBase(BaseModel):
    telegram_id: Optional[int]
    name: str
    level: Qualification
    picture: Optional[str]
    privilage: PrivilegeLevel

class UserCreate(UserBase):
    picture: Optional[str]

class UserUpdate(UserBase):
    ...

class UserInDbBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

class User(UserInDbBase):
    pass

class UserList(BaseModel):
    result: Sequence[User]
    
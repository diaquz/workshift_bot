from pydantic import BaseModel
from app.model.user import Qualification, PrivilegeLevel

class User(BaseModel):
    id: int
    telegram_id: int
    name: str
    username: str
    level: Qualification
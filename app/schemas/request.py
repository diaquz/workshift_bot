from pydantic import BaseModel
from app.model.user import Qualification

class Request(BaseModel):
    id: int
    telegram_id: int
    name: str
    username: str
    level: Qualification

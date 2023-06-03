from pydantic import BaseModel
from typing import Optional

class TelegramAuthRequest(BaseModel):
    id: str
    first_name: str
    last_name: Optional[str]
    username: str 
    photo_url: Optional[str]
    auth_date: int
    hash: str

    def get_check_string(self):
        dictionary = self.dict()
        del dictionary['hash']
        filtred = filter(lambda x: x[1] is not None, sorted(dictionary.items()))

        return '\n'.join(map(lambda x: f'{x[0]}={x[1]}', filtred))
    

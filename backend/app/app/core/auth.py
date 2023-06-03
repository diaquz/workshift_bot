from datetime import datetime, timedelta
from jose import jwt

from app.core.config import settings

from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/telegram")


def create_access_token(sub) -> str:
    return _create_token(
        token_type="access_token",
        lifetime=timedelta(minutes=settings.ACCESS_TOKE_EXPIRE_MINUTES),
        sub = sub
    )
    

def _create_token(
    token_type: str,
    lifetime: timedelta,
    sub: int
) -> str:

    expire = datetime.utcnow() + lifetime
    payload = {
        "type": token_type,
        "exp": expire,
        "iat": datetime.utcnow(),
        "sub": str(sub)
    }

    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.ALGORIHM)
    
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.api import deps
from app.schemas.telegram import TelegramAuthRequest
from app.schemas.request import RequestCreate, RequestList
from app import schemas

from app.model.user import PrivilegeLevel
from app.core.security import verify_telegram
from app.core.auth import create_access_token

from app import repository

router = APIRouter()

@router.post("/telegram", status_code=200)
def telegram_login(*,
    data: TelegramAuthRequest,
    db: Session = Depends(deps.get_db)
):
    if verify_telegram(data):
        user_id = int(data.id)
        user = repository.user.get_by_telegram(db, user_id)

        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not found")
        
        return {
            "access_token": create_access_token(user.id),
            "token_type": "bearer"
        }

    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect authentication token")


@router.post("/register", status_code=200)
def register(*,
    token: TelegramAuthRequest,
    data: RequestCreate,
    db: Session = Depends(deps.get_db)
):
    if verify_telegram(token):
        tg_id = int(token.id)
        request = repository.request.get_by_telegram(db, tg_id)

        if request:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Already registered")
        else:
            data.telegram_id = tg_id
            data.picture = token.photo_url
            result = repository.request.create(db, obj_in=data)
            
            return {
                'result': result
            }
        
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect authentication token")


@router.get("/requests", status_code=200, response_model=RequestList)
def fetch_requests(
    offset: Optional[int] = 0,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    requests = repository.request.get_many(db, offset=offset, limit=limit) #type: ignore

    return {
        "result": list(requests)
    }

@router.post("/requests/accept", status_code=status.HTTP_200_OK, response_model=schemas.User)
def accept_request(
    request_id: int,
    db: Session = Depends(deps.get_db)
):
    request = repository.request.get(db, request_id)
    if request is not None:
        obj_in = schemas.UserCreate(
            telegram_id=request.telegram_id, #type: ignore
            name = request.name, #type: ignore
            level = request.level, #type: ignore
            privilage=PrivilegeLevel.User,
            picture=""
        )

        new_user = repository.user.create(db, obj_in=obj_in)
        repository.request.remove(db, id = request_id)

        return new_user
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request does not exist")


@router.post("/requests/dismiss", status_code=status.HTTP_200_OK, response_model=schemas.User)
def dismiss_request(
    request_id: int,
    db: Session = Depends(deps.get_db)
):
    request = repository.request.get(db, request_id)
    if request is not None:
        repository.request.remove(db, id = request_id)

        return request
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request does not exist")

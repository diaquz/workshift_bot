from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.api import deps
from app import repository

from app.model.user import User
from app import schemas
from app.schemas.user import UserList

router = APIRouter()

@router.get("/me", status_code=status.HTTP_200_OK, response_model=schemas.User)
def get_current_user(
    user: User = Depends(deps.get_user)
) -> dict:
    return user

@router.get("/", status_code=status.HTTP_200_OK, response_model=UserList)
def fetch_users(
    offset: Optional[int] = 0,
    limit: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
    # user: User = Depends(deps.get_user)
):
    users = repository.user.get_many(db, offset=offset, limit=limit) # type: ignore
    return {
        'result': list(users)
    }

@router.get("/search", status_code=status.HTTP_200_OK, response_model=UserList)
def search_users(
    keyword: str,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED)

@router.post('/delete', status_code=status.HTTP_200_OK, response_model=schemas.User)
def delete_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
    user: User = Depends(deps.get_user)
):
    if repository.user.hasPermission(user):
        obj = repository.user.get(db, user_id)

        if obj is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        deleted_user = repository.user.remove(db, id=user_id)

        return deleted_user
    
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")   


def edit_user():
    pass

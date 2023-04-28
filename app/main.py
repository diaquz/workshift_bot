# from flask import Flask

# flask_app = Flask(__name__, static_url_path='', static_folder='app/frontend/build')

# from app import routes

from fastapi import FastAPI, APIRouter
# from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from pathlib import Path



app = FastAPI(
    title="Recipe API", openapi_url="/openapi.json"
)

# root_router = APIRouter()

# @root_router.get("/", status_code=200)
# def root() -> dict:
#     return {"msg": "Hello, World!"}


# app.include_router(root_router)
app.include_router(api_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="debug")

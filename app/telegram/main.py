from aiogram import executor
from app.telegram import dp

def start():
    from . import handlers
    
    executor.start_polling(dp)
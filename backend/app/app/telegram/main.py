from aiogram import executor
from app.telegram.scheluder import start_shedule
from app.telegram import dp

def start():
    from . import handlers
    
    executor.start_polling(dp, on_startup=start_shedule)


if __name__ == "__main__":
    start()
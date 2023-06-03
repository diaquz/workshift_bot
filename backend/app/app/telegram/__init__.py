from aiogram import Bot, Dispatcher, types, executor
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from threading import Thread
import asyncio

from app.core.config import settings

bot = Bot(token=settings.TELEGRAM_TOKEN)
dp = Dispatcher(bot)


    

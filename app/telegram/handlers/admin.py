from aiogram import types
from aiogram.dispatcher.filters import CommandHelp, CommandStart
from aiogram.utils.callback_data import CallbackData
from app.telegram import dp, bot

from logging import getLogger

cb_add_user = CallbackData("add_user", "id", "choice")
cb_merge_user = CallbackData("merge_user", "rid", "uid")



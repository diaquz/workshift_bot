from aiogram import types
from aiogram.dispatcher.filters import CommandHelp, CommandStart
from aiogram.utils.callback_data import CallbackData
from contextlib import closing
from logging import getLogger

from app.api.deps import get_db
from app import repository 
from app.model.user import Qualification, PrivilegeLevel, to_qualification
from app import schemas

from app.telegram import dp, bot
from app.telegram.utils.markup import delete_keyboard
from app.telegram.utils.time_utils import parse_date
from app.telegram.utils.format import format_events
from datetime import timedelta


logger = getLogger('telegram')

@dp.message_handler(commands=["schedule"])
async def cmd_schedule(message: types.Message):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        if user:
            date = parse_date(message.text)
            end_date = date + timedelta(days=7)
            
            events = repository.event.get_for_user(db, id=user.id, start_date=date, end_date=end_date) # type: ignore

            await message.reply(format_events(events))        

from aiogram import types
from aiogram.dispatcher.filters import CommandHelp, CommandStart
from aiogram.utils.callback_data import CallbackData
from app.telegram import dp, bot
from contextlib import closing
from app.api.deps import get_db
from app import repository 
from app import schemas
from app.model.user import PrivilegeLevel
from app.telegram.utils.markup import delete_keyboard

from logging import getLogger

cb_add_user = CallbackData("add_user", "id", "add")

logger = getLogger("Admin")

async def send_new_request(request):
    with closing(get_db()) as session:
        db = next(session)

        message = f"""
            Новый запрос о добавлении!
            Имя: {request.name}
            Уровень: {request.level}
         """
        
        markup = types.InlineKeyboardMarkup(row_width=3).add(*[
            types.InlineKeyboardButton(("Новый пользователь"), callback_data=cb_add_user.new(id=request.id, add=True)), #type: ignore
            types.InlineKeyboardButton(("Отклонить"), callback_data=cb_add_user.new(id=request.id, add=False)) #type: ignore
        ])

        admins = repository.user.get_admins(db)

        for admin in admins:

            try:
                await bot.send_message(chat_id=admin.telegram_id, text=message, reply_markup=markup) #type: ignore
            except Exception as e:
                logger.info(f"Can't send message to {admin.name}")

        
@dp.callback_query_handler(cb_add_user.filter())
async def request_admin_choice(query: types.CallbackQuery, callback_data: dict):
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=query.from_user.id)

        if user and repository.user.hasPermission(user):
            request = repository.request.get(db, callback_data["id"])

            if request:
                if callback_data["add"]:
                    obj_in = schemas.UserCreate(
                        telegram_id=request.id,
                        name=request.name,
                        level=request.level,
                        privilage=PrivilegeLevel.User #type: ignore
                    )

                    repository.user.create(db, obj_in=obj_in)

                repository.request.remove(db, request.id)  #type: ignore

            await delete_keyboard(query)


async def send_feedback(feedback):
    with closing(get_db()) as session:
        db = next(session)
        message = f"""
            Сообщение от пользователя: {feedback.name}
            {feedback.message}
        """

        admins = repository.user.get_admins(db)

        for admin in admins:

            try:
                await bot.send_message(chat_id=admin.telegram_id, text=message) #type: ignore
            except Exception as e:
                logger.info(f"Can't send message to {admin.name}")

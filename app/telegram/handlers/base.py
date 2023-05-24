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

cb_level_choice = CallbackData("level_choice", "level", "name")
logger = getLogger('telegram')


@dp.message_handler(CommandStart())
async def cmd_start(message: types.Message):
    logger.info(f"/start command from user({message.from_user.id}, {message.from_user.full_name})")
    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        request = repository.request.get_by_telegram(db, id=message.from_user.id)

        if user or request:
            await message.answer("Пользователь с такими данными уже есть в системе.\nВоспользуйся командой /help для получения сводки о доступных коммандах")

        else:
            await message.answer("Введи свои имя и фамилию")    

@dp.message_handler(content_types=types.ContentTypes.ANY, chat_type=types.ChatType.PRIVATE)
async def plain_message(message: types.Message):
    logger.info(f"Message from ({message.from_user.id}, {message.from_user.full_name}): {message.text}")

    with closing(get_db()) as session:
        db = next(session)

        user = repository.user.get_by_telegram(db, id=message.from_user.id)
        request = repository.request.get_by_telegram(db, id=message.from_user.id)

        if user or request:
            await message.answer("Неизвестная комманда\nВоспользуйся командой /help для получения сводки о доступных коммандах")
        else:
            logger.info(f"Create level choice keyboard for ({message.from_user.id}, {message.from_user.full_name})")
        
            markup = types.InlineKeyboardMarkup(row_width=3).add(*[
                types.InlineKeyboardButton(("Easy"), callback_data=cb_level_choice.new(level=Qualification.Easy, name=message.text)),
                types.InlineKeyboardButton(("Medium"), callback_data=cb_level_choice.new(level=Qualification.Medium, name=message.text)),
                types.InlineKeyboardButton(("Hard"), callback_data=cb_level_choice.new(level=Qualification.Hard, name=message.text)),
                types.InlineKeyboardButton(("Master"), callback_data=cb_level_choice.new(level=Qualification.Master, name=message.text))
            ])

            await message.reply(text="Выбери свой уровень навыка", reply_markup=markup)


@dp.callback_query_handler(cb_level_choice.filter())
async def user_register(query: types.CallbackQuery, callback_data: dict):
    logger.info(f"Create new request: ({query.from_user.id}, {callback_data['name']}, {callback_data['level']})")
    with closing(get_db()) as session:
        db = next(session)

        request = repository.request.get_by_telegram(db, id=query.from_user.id)

        if request:
            await delete_keyboard(query)
        else:
            picture = await bot.get_user_profile_photos(query.from_user.id)

            obj = schemas.RequestCreate(
                name=callback_data['name'],
                level=to_qualification(callback_data['level']), #type: ingored,
                telegram_id=query.from_user.id,
                picture=picture.photos[0][0].file_id
            )
            new_request = repository.request.create(db, obj_in=obj)

            await delete_keyboard(query)
            await query.message.reply(text="Поздравляю, ты успешно зарегистрирован 0__.__0")


@dp.message_handler(CommandHelp())
async def cmd_help(message: types.Message):
    await message.answer("я мать продам, я жопу не продам (продам)")

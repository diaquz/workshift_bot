from app.db.session import Session
from app import repository
from app.telegram.utils import get_message_data
from app.telegram.sender import reply
from app.telegram.markup import create_level_markup
from app.telegram.callback import RegisterCallback

async def cmd_start(db: Session, message: dict):
    user_id, message_id, chat_id, text = get_message_data(message)

    user = repository.user.get(db, id=user_id)
    request = repository.request.get(db, id=user_id)

    if user or request:
        await reply(chat_id, message_id, "Пользователь с такими данными уже есть в системе", None)
    else:
        await reply(chat_id, message_id, "Для начала регистрации введи свое имя", None)

async def cmd_default(db: Session, message: dict):
    user_id, message_id, chat_id, text = get_message_data(message)

    user = repository.user.get(db, id=user_id)
    request = repository.request.get(db, id=user_id)

    if user or request:
        await reply(chat_id, message_id, "Пользователь с такими данными уже есть в системе", None)
    else:
        name = text[:30].replace(':', ' ')
        callback = lambda type: RegisterCallback(name, type)
        await reply(chat_id, message_id, "Пользователь с такими данными уже есть в системе", create_level_markup(callback))



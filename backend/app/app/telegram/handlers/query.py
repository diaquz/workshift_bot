from app import repository
from app.schemas import RequestCreate
from app.telegram.sender import delete_keyboard, reply

async def handle_select_event(db, message, data):
    pass

async def handle_register(db, message, data):
    user_id, message_id, chat_id = get_message_data(message)

    user = repository.user.get(db, id=user_id)
    request = repository.request.get(db, id=user_id)
    
    if user or request:
        pass
    else:
        obj_in = RequestCreate(
            telegram_id=user_id,
            name=data["name"],
            level=data["level"],
            picture=""
        )

        new_request = repository.request.create(db, obj_in=obj_in)

        await reply(chat_id, message_id, "Запрос на регистрацию отправлен", None)

    await delete_keyboard(chat_id, message_id)



def get_message_data(message):
    return  message['from']['id'], message['message_id'], message['chat']['id']

import aiohttp
import json
from app.core.config import settings

async def send(user_id, data, markup):
    head = {
        'Content-Type': 'application/json'
    }
    message = {
        'chat_id': user_id,
        'text': data
    }


async def reply(chat_id, message_id, message, markup):
    head = {
        'Content-Type': 'application/json'
    }
    message = {
        'chat_id': chat_id,
        'reply_to_message_id': message_id,
        'text': message,
        'parse_mode': 'MarkdownV2'
    }

    if markup:
        message['reply_markup'] = markup

    return await call_send_api(settings.SEND_URL, head, message)

async def delete_keyboard(chat_id, message_id):
    head = {
        'Content-Type': 'application/json'
    }
    message = {
        'chat_id': chat_id,
        'reply_to_message_id': message_id,
        'reply_markup': [[]]
    }

    await call_send_api(settings.EDIT_REPLY_URL, head, message)


async def call_send_api(url, header, data):
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=json.dumps(data), header=header) as response:
            return response.status == 200

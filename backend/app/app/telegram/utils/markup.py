from aiogram import types
from logging import getLogger

logger = getLogger('utils')

async def delete_keyboard(callback_query):
    try:
        await callback_query.message.delete_reply_markup()
    except Exception as e:
        logger.info("Failed to delete keyboard markup")

def create_markup(data, callback):
    markup = types.InlineKeyboardMarkup()
    for key in data:
        markup.add(types.InlineKeyboardButton(text=key, callback_data=callback(data[key])))

    return markup



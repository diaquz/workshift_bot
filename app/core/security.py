from app.schemas.telegram import TelegramAuthRequest

import hmac
import hashlib

from app.core.config import settings

def verify_telegram(
    data: TelegramAuthRequest
):
    hash = data.hash
    check_string = data.get_check_string()

    secret_key = hashlib.sha256(bytes(settings.TELEGRAM_TOKEN, 'utf-8')).digest()
    signature = hmac.new(secret_key, bytes(check_string, 'utf-8'), digestmod=hashlib.sha256).hexdigest()

    return signature == hash

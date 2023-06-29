from app import repository
from app.db.session import Session
from datetime import timedelta

from app.telegram.utils.time_utils import parse_date
from app.telegram.markup import list_markup, event_list
from app.telegram.sender import reply
from app.telegram.callback import SelectOfferCallback, SelectEventCallback
from app.telegram.format import event_format
from app.telegram.utils import get_message_data

async def cmd_schedule(db: Session, message):
    user_id, message_id, chat_id, text = get_message_data(message)
    user = repository.user.get(db, id=user_id)

    if user:
        date = parse_date(text)
        end_date = date + timedelta(days=7)

        events = repository.event.get_for_user(db, id=user.id, start_date=date, end_date=end_date) #type: ignore

        if events and len(events) > 0:
            # markup = list_markup(events, lambda item: "0", lambda item: SelectOfferCallback(item.id))
            data = event_list(events)
            await reply(chat_id, message_id, data, None)
        else: 
            await reply(chat_id, message_id, "Нет найденных событий", None)

async def cmd_select(db: Session, message):
    user_id, message_id, chat_id, text = get_message_data(message)
    user = repository.user.get(db, id=user_id)

    if user:
        date = parse_date(text)
        end_date = date + timedelta(days=7)

        events = repository.event.get_by_date_and_type(db, id=user.id, start_date=date, end_date=end_date, type=EventType.Workshift) # type: ignore

        if events and len(events) > 0:
            markup = list_markup(events, event_format, lambda event: SelectEventCallback(event.id).pack())
            await reply(chat_id, message_id, "Выберите событие для обмена", markup)

def cmd_offers(db: Session, message):
    pass

def cmd_answers(db: Session, message):
    pass

def cmd_my_offers(db: Session, message):
    pass

def cmd_my_answers(db: Session, message):
    pass

def cmd_feedback(db: Session, message):
    pass


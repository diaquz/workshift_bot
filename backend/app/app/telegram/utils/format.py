from aiogram import types

def format_events(events):
    result = ""

    for event in events:
        result += f'*{event.start_time.strftime("%a %d")}'
        if(event.start_time.day != event.end_time.day):
            result += f' - {event.end_time.strftime("%d")}*'

        result += f'\n\t{event.start_time.strftime("%H:%M")} - {event.end_time.strftime("%H:%M")} {event.title}\n'

    return result


def event_markup(events, callback):
    markup = types.InlineKeyboardMarkup()

    for event in events:

        name = f'{event.start_time.strftime("%a %d %H:M")} - {event.end_time.strftime("%H:%M")} {event.title}'

        markup.add(types.InlineKeyboardButton(name, callback_data=callback.new(id=event.id))) # type: ignore

    return markup

def accept_offer_markup(events, callback, id):
    markup = types.InlineKeyboardMarkup()

    for event in events:

        name = f'{event.start_time.strftime("%a %d %H:M")} - {event.end_time.strftime("%H:%M")} {event.title}'

        markup.add(types.InlineKeyboardButton(name, callback_data=callback.new(id=event.id, offer_id=id))) # type: ignore

    return markup


def answers_markup(answers, callback):
    markup = types.InlineKeyboardMarkup()

    for answer in answers:
        event = answer.offer.workshift
        name = f'{event.start_time.strftime("%a %d %H:M")} - {event.end_time.strftime("%H:%M")} {event.title}'

        markup.add(types.InlineKeyboardButton(name, callback_data=callback.new(id=answer.id))) # type: ignore
        
    return markup

def offers_markup(offers, callback):

    markup = types.InlineKeyboardMarkup()

    for offer in offers:
        event = offer.workshift
        name = f'{event.start_time.strftime("%a %d %H:M")} - {event.end_time.strftime("%H:%M")} {event.title}'

        markup.add(types.InlineKeyboardButton(name, callback_data=callback.new(id=event.id))) # type: ignore
        
    return markup
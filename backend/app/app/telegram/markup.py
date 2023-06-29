from app.model.user import Qualification

def event_list(events):
    result = ""

    for event in events:
        result += f'*{event.start_time.strftime("%a %d")}'
        if(event.start_time.day != event.end_time.day):
            result += f' - {event.end_time.strftime("%d")}*'

        result += f'\n\t{event.start_time.strftime("%H:%M")} - {event.end_time.strftime("%H:%M")} {event.title}\n'

    return result

def list_markup(data, textfunc, callbackfunc):

    markup = []
    for item in data:
        markup.append([{
            'text': textfunc(item),
            'callback_data': callbackfunc(item)
        }])
    
    return markup

def paged_markup(data, textfunc, callbackfunc, prev, next):
    markup = []
    for item in data:
        markup.append([{
            'text': textfunc(item),
            'callback_data': callbackfunc(item)
        }])
    
    markup.append([
        { 'text': '<', 'callback_data': prev },
        { 'text': '>', 'callback_data': next }
    ])

    return markup
 

def create_level_markup(callback):
    markup = [
        [ {'text': 'Easy', 'callback_data': callback(Qualification.Easy)} ],
        [ {'text': 'Medium', 'callback_data': callback(Qualification.Medium)} ],
        [ {'text': 'Hard', 'callback_data': callback(Qualification.Hard)} ],
        [ {'text': 'Master', 'callback_data': callback(Qualification.Master)} ]
    ]

    return markup

from datetime import datetime

def format_events(events):
    result = ""

    for event in events:
        result += event.start_time.strftime("%a %d %b %H:%M")
        result += event.end_time.strftime("%H:%M" if event.start_time.day == event.end_time.day else "%d %b %H:%M")
        result += "Рабочая смена\n"

    return result
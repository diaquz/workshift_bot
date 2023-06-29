

def event_format(event):
    return f'{event.start_time.strftime("%a %d %H:M")} - {event.end_time.strftime("%H:%M")} {event.title}'

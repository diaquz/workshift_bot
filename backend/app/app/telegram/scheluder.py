import aioschedule
from contextlib import closing
from app.api.deps import get_db
from app import repository 
from datetime import datetime, timedelta
from app.telegram.handlers.admin import send_new_requests, send_feedback


async def send():
    with closing(get_db()) as session:
        db = next(session)
        timestamp = (datetime.utcnow() - timedelta(minutes=5, seconds=1)).timestamp()

        requests = repository.request.get_by_timestamp(db, timestamp)
        for request in requests:
            await send_new_requests(request)

        feedbacks = repository.feedback.get_by_timetamp(db, timestamp)
        for feedback in feedbacks:
            await send_feedback(feedback)


def start_shedule():
    aioschedule.every(5).minute.do(send)
    pass
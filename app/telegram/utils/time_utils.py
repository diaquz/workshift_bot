from datetime import datetime
import re


def parse_date(message: str):
    try:
        return get_date(message)
    except Exception as e:
        return datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

def get_date(message: str):
    result = re.search(r'(\d{1,2})\.(\d{1,2})\.{0,1}(\d{0,4})', message)

    if result:
        day = int(result.group(1))
        month = int(result.group(2))
        year = datetime.utcnow().year

        if result.group(3):
            length = len(result.group(3))
            add = 2000 if length < 3 else 0
            year = add + int(result.group(3))

        return datetime(year=year, month=month, day=day)
    
    return datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
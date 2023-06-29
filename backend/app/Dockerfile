FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app
COPY alembic.ini /code/
COPY ./alembic /code/alembic
COPY init_data.py /code/


CMD ["alembic", "upgrade", "head"]
CMD ["python", "init_data.py"]
CMD  ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "443"]

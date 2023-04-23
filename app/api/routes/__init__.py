from app import flask_app
from flask import render_template, logging


@flask_app.route('/')
def index():
    return "Hello, world!"

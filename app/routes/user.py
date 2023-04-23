from main import flask_app
from flask import render_template

@flask_app.route('/schedule')
def schedule():
    return "Hello, world!"

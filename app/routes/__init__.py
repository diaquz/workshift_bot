from main import flask_app
from flask import render_template, send_from_directory


@flask_app.route('/')
def index():
    return send_from_directory(flask_app.static_folder, 'index.html')

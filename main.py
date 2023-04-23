from flask import Flask

flask_app = Flask(__name__, static_url_path='', static_folder='app/frontend/build')

from app import routes

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost:5432/tododb'  # update your DB URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'MYNAMEISVIDHAN'  # change to a strong secret

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    return app

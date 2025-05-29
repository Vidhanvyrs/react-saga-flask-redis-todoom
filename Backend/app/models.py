from . import db
from datetime import datetime

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)  # New field
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # New field
    completed = db.Column(db.Boolean, default=False)

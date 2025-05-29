from flask import Blueprint, request, jsonify
from .models import Todo
from . import db
from datetime import datetime

main = Blueprint('main', __name__)

# Get all todos
@main.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([
        {
            'id': t.id,
            'title': t.title,
            'description': t.description,
            'createdAt': t.created_at.isoformat() if t.created_at else None,
            'completed': t.completed
        } for t in todos
    ])

# Create a new todo
@main.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        created_at=datetime.fromisoformat(data['createdAt']) if 'createdAt' in data else datetime.utcnow()
    )
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({
        'id': new_todo.id,
        'title': new_todo.title,
        'description': new_todo.description,
        'createdAt': new_todo.created_at.isoformat(),
        'completed': new_todo.completed
    }), 201

# Update an existing todo
@main.route('/todos/<int:id>', methods=['PUT'])
def edit_todo(id):
    todo = Todo.query.get_or_404(id)
    data = request.get_json()
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    return jsonify({
        'id': todo.id,
        'title': todo.title,
        'description': todo.description,
        'createdAt': todo.created_at.isoformat(),
        'completed': todo.completed
    })

# Delete a todo
@main.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': f'Todo with id {id} deleted'})

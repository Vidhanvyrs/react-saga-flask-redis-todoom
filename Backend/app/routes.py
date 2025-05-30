# from flask import Blueprint, request, jsonify
# from .models import Todo
# from . import db
# from datetime import datetime

# main = Blueprint('main', __name__)

# # Get all todos
# @main.route('/todos', methods=['GET'])
# def get_todos():
#     todos = Todo.query.all()
#     return jsonify([
#         {
#             'id': t.id,
#             'title': t.title,
#             'description': t.description,
#             'createdAt': t.created_at.isoformat() if t.created_at else None,
#             'completed': t.completed
#         } for t in todos
#     ])

# # Create a new todo
# @main.route('/todos', methods=['POST'])
# def create_todo():
#     data = request.get_json()
#     new_todo = Todo(
#         title=data['title'],
#         description=data.get('description', ''),
#         created_at=datetime.fromisoformat(data['createdAt']) if 'createdAt' in data else datetime.utcnow()
#     )
#     db.session.add(new_todo)
#     db.session.commit()
#     return jsonify({
#         'id': new_todo.id,
#         'title': new_todo.title,
#         'description': new_todo.description,
#         'createdAt': new_todo.created_at.isoformat(),
#         'completed': new_todo.completed
#     }), 201

# # Update an existing todo
# @main.route('/todos/<int:id>', methods=['PUT'])
# def edit_todo(id):
#     todo = Todo.query.get_or_404(id)
#     data = request.get_json()
#     todo.title = data.get('title', todo.title)
#     todo.description = data.get('description', todo.description)
#     todo.completed = data.get('completed', todo.completed)
#     db.session.commit()
#     return jsonify({
#         'id': todo.id,
#         'title': todo.title,
#         'description': todo.description,
#         'createdAt': todo.created_at.isoformat(),
#         'completed': todo.completed
#     })

# # Delete a todo
# @main.route('/todos/<int:id>', methods=['DELETE'])
# def delete_todo(id):
#     todo = Todo.query.get_or_404(id)
#     db.session.delete(todo)
#     db.session.commit()
#     return jsonify({'message': f'Todo with id {id} deleted'})

from flask import Blueprint, request, jsonify
from .models import User, Todo
from . import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
import redis
import json

main = Blueprint('main', __name__)

##Redis Setup !!!
r = redis.Redis(host='localhost', port=6379, db=0)

# User Registration !!!!
@main.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User with that username or email already exists'}), 409

    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# User Login !!!
@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# from flask_jwt_extended import jwt_required, get_jwt_identity

@main.route('/todos', methods=['GET'])
@jwt_required()
def get_todos():
    user_id = int(get_jwt_identity())
    cache_key = f"todos:{user_id}"
    cached = r.get(cache_key)
    if cached:
        todos_data = json.loads(cached)
    else:
        todos = Todo.query.filter_by(user_id=user_id).all()
        todos_data = [
            {
                'id': t.id,
                'title': t.title,
                'description': t.description,
                'createdAt': t.created_at.isoformat() if t.created_at else None,
                'completed': t.completed
            } for t in todos
        ]
        r.set(cache_key, json.dumps(todos_data), ex=300)  # paach min ka cache here
    return jsonify(todos_data)

@main.route('/todos', methods=['POST'])
@jwt_required()
def create_todo():
    data = request.get_json()
    user_id = int(get_jwt_identity())
    new_todo = Todo(
        title=data['title'],
        description=data.get('description', ''),
        created_at=datetime.fromisoformat(data['createdAt']) if 'createdAt' in data else datetime.utcnow(),
        user_id=user_id
    )
    db.session.add(new_todo)
    db.session.commit()
    # deleting cache here
    r.delete(f"todos:{user_id}")
    return jsonify({
        'id': new_todo.id,
        'title': new_todo.title,
        'description': new_todo.description,
        'createdAt': new_todo.created_at.isoformat(),
        'completed': new_todo.completed
    }), 201

@main.route('/todos/<int:id>', methods=['PUT'])
@jwt_required()
def edit_todo(id):
    user_id = int(get_jwt_identity())
    todo = Todo.query.filter_by(id=id, user_id=user_id).first_or_404()
    data = request.get_json()
    todo.title = data.get('title', todo.title)
    todo.description = data.get('description', todo.description)
    todo.completed = data.get('completed', todo.completed)
    db.session.commit()
    # deleting the cache here for the user 
    r.delete(f"todos:{user_id}")
    return jsonify({
        'id': todo.id,
        'title': todo.title,
        'description': todo.description,
        'createdAt': todo.created_at.isoformat(),
        'completed': todo.completed
    })

@main.route('/todos/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_todo(id):
    user_id = int(get_jwt_identity())
    todo = Todo.query.filter_by(id=id, user_id=user_id).first_or_404()
    db.session.delete(todo)
    db.session.commit()
    # Invalidate cache for this user
    r.delete(f"todos:{user_id}")
    return jsonify({'message': f'Todo with id {id} deleted'})
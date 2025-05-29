import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector(state => state.todos.todos);

  return (
    <div>
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      ) : (
        <p>No todos found. Add one to get started!</p>
      )}
    </div>
  );
};

export default TodoList;
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';
// export const TODOS_FETCHED = 'TODOS_FETCHED';

export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo
});

export const editTodo = (id, updatedTodo) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});
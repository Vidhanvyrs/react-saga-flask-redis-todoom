// export const ADD_TODO = 'ADD_TODO';
// export const EDIT_TODO = 'EDIT_TODO';
// export const DELETE_TODO = 'DELETE_TODO';
// export const FETCH_TODOS = 'FETCH_TODOS';
// export const TODOS_FETCHED = 'TODOS_FETCHED';

// export const fetchTodos = () => ({
//   type: FETCH_TODOS
// });

// export const addTodo = (todo) => ({
//   type: ADD_TODO,
//   payload: todo
// });

// export const editTodo = (id, updatedTodo) => ({
//   type: EDIT_TODO,
//   payload: { id, updatedTodo }
// });

// export const deleteTodo = (id) => ({
//   type: DELETE_TODO,
//   payload: id
// });

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const EDIT_TODO_REQUEST = 'EDIT_TODO_REQUEST';
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const TODOS_FETCHED = 'TODOS_FETCHED';

export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const addTodoRequest = (todo) => ({
  type: ADD_TODO_REQUEST,
  payload: todo
});

export const editTodoRequest = (id, updatedTodo) => ({
  type: EDIT_TODO_REQUEST,
  payload: { id, updatedTodo }
});

export const deleteTodoRequest = (id) => ({
  type: DELETE_TODO_REQUEST,
  payload: id
});
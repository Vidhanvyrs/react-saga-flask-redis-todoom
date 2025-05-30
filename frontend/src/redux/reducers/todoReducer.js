import {
  ADD_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_TODOS,
  TODOS_FETCHED
} from '../actions/todoActions';

const initialState = {
  todos: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return state;
    case TODOS_FETCHED:
      return {
        ...state,
        todos: action.payload
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EDIT_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload.updatedTodo : todo
        )
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

export default todoReducer;
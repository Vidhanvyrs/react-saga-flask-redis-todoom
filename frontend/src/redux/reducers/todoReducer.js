import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  TODOS_FETCHED
} from '../actions/todoActions';

const initialState = {
  todos: [
    { 
      id: 1, 
      title: 'Netflix chill', 
      description: 'chilling out',
      createdAt: new Date('2023-05-01T10:00:00').toISOString() 
    },
    { 
      id: 2, 
      title: 'Build a project', 
      description: 'Create a todo app',
      createdAt: new Date('2023-05-02T14:30:00').toISOString()
    },
    { 
      id: 3, 
      title: 'Watch F1', 
      description: 'This weekends F1 race is up',
      createdAt: new Date('2023-05-03T09:15:00').toISOString()
    }
  ]
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
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload.updatedTodo : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

export default todoReducer;
// // import { put, takeEvery } from 'redux-saga/effects';
// // import {
// //   FETCH_TODOS,
// //   ADD_TODO,
// //   EDIT_TODO,
// //   DELETE_TODO
// // } from '../actions/todoActions';

// // function* fetchTodosSaga() {
// //   // API SE FETCH KARNA HAI YAHA PE 
// //   yield put({ type: 'TODOS_FETCHED' });
// // }

// // function* todoSaga() {
// //   yield takeEvery(FETCH_TODOS, fetchTodosSaga);
// //   // MORE SAGAS TO BE ADDED EKBAAR BACKEND BAN JAYE TOH
// // }

// // export default todoSaga;

// import { put, takeEvery, call } from 'redux-saga/effects';
// import {
//   FETCH_TODOS,
//   ADD_TODO,
//   EDIT_TODO,
//   DELETE_TODO,
//   TODOS_FETCHED
// } from '../actions/todoActions';
// import Api from '../../utils/Api'; 

// function* fetchTodosSaga() {
//   try {
//     const response = yield call(Api.fetch, '/todos?_limit=10');
//     yield put({ type: TODOS_FETCHED, payload: response });
//   } catch (error) {
//     yield put({ type: 'TODOS_FETCH_FAILED', error });
//   }
// }

// function* addTodoSaga(action) {
//   try {
//     const response = yield call(Api.fetch, '/todos', {
//       method: 'POST',
//       body: JSON.stringify(action.payload),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     yield put({ type: ADD_TODO, payload: { ...action.payload, id: response.id || Date.now() } });
//   } catch (error) {
//     console.error('Error adding todo:', error);
//   }
// }

// function* editTodoSaga(action) {
//   try {
//     const { id, updatedTodo } = action.payload;
//     yield call(Api.fetch, `/todos/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(updatedTodo),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     yield put({ type: EDIT_TODO, payload: { id, updatedTodo } });
//   } catch (error) {
//     console.error('Error editing todo:', error);
//   }
// }

// function* deleteTodoSaga(action) {
//   try {
//     const id = action.payload;
//     yield call(Api.fetch, `/todos/${id}`, { method: 'DELETE' });
//     yield put({ type: DELETE_TODO, payload: id });
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//   }
// }

// function* todoSaga() {
//   yield takeEvery(FETCH_TODOS, fetchTodosSaga);
//   yield takeEvery(ADD_TODO, addTodoSaga);
//   yield takeEvery(EDIT_TODO, editTodoSaga);
//   yield takeEvery(DELETE_TODO, deleteTodoSaga);
// }

// export default todoSaga;

import { put, takeEvery, call } from 'redux-saga/effects';
import {
  FETCH_TODOS,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  TODOS_FETCHED
} from '../actions/todoActions';
import Api from '../../utils/Api';

function* fetchTodosSaga() {
  try {
    const response = yield call(Api.fetch, '/todos?_limit=10');
    yield put({ type: TODOS_FETCHED, payload: response });
  } catch (error) {
    yield put({ type: 'TODOS_FETCH_FAILED', error });
  }
}

function* addTodoSaga(action) {
  try {
    const response = yield call(Api.fetch, '/todos', {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: { 'Content-Type': 'application/json' }
    });
    yield put({ type: ADD_TODO_SUCCESS, payload: { ...action.payload, id: response.id || Date.now() } });
  } catch (error) {
    console.error('Error adding todo:', error);
  }
}

function* editTodoSaga(action) {
  try {
    const { id, updatedTodo } = action.payload;
    yield call(Api.fetch, `/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
      headers: { 'Content-Type': 'application/json' }
    });
    yield put({ type: EDIT_TODO_SUCCESS, payload: { id, updatedTodo } });
  } catch (error) {
    console.error('Error editing todo:', error);
  }
}

function* deleteTodoSaga(action) {
  try {
    const id = action.payload;
    yield call(Api.fetch, `/todos/${id}`, { method: 'DELETE' });
    yield put({ type: DELETE_TODO_SUCCESS, payload: id });
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
}

function* todoSaga() {
  yield takeEvery(FETCH_TODOS, fetchTodosSaga);
  yield takeEvery(ADD_TODO_REQUEST, addTodoSaga);
  yield takeEvery(EDIT_TODO_REQUEST, editTodoSaga);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodoSaga);
}

export default todoSaga;
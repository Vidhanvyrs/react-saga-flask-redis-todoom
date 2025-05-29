import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../../utils/Api';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/authActions';

function* registerSaga(action) {
  try {
    const res = yield call(Api.fetch, '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    localStorage.setItem('token', res.access_token);
    yield put({ type: REGISTER_SUCCESS, payload: res.access_token });
  } catch (error) {
    yield put({ type: REGISTER_FAILURE, payload: error.message });
  }
}

function* loginSaga(action) {
  try {
    const res = yield call(Api.fetch, '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    localStorage.setItem('token', res.access_token);
    yield put({ type: LOGIN_SUCCESS, payload: res.access_token });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

function* logoutSaga() {
  localStorage.removeItem('token');
 yield null;
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

export default authSaga;
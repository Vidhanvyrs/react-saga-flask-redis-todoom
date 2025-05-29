import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/authActions';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: // auto-login after register
      return { ...state, loading: false, isAuthenticated: true, token: action.payload, error: null };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, isAuthenticated: false, token: null };
    default:
      return state;
  }
};

export default authReducer;
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
  registerSuccess: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null, registerSuccess: false };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, registerSuccess: true, error: null };
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload, registerSuccess: false };
    case LOGOUT:
      return { ...state, isAuthenticated: false, registerSuccess: false, token: null };
    default:
      return state;
  }
};

export default authReducer;
import {
  SIGN_IN,
  SIGN_OUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isSignedIn: null,
  isAuthenticated: null,
  userId: null,
  error: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case REGISTER_SUCCESS:
      // case LOGIN_SUCCESS:
      // we need to put token inside of localstorage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      // case AUTH_ERROR:
      // case LOGIN_FAIL:
      // case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

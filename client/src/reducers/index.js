import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import moviesReducer from './moviesReducer';
import authReducer from './authReducer';
import userActionsReducer from './userActionsReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  movies: moviesReducer,
  form: formReducer,
  auth: authReducer,
  userActions: userActionsReducer,
  alert: alertReducer
});

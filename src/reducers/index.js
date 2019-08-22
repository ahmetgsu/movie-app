import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import moviesReducer from "./moviesReducer";
import authReducer from "./authReducer";

export default combineReducers({
  movies: moviesReducer,
  form: formReducer,
  auth: authReducer
});

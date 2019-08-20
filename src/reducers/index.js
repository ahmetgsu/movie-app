import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import moviesReducer from "./moviesReducer";

export default combineReducers({
  movies: moviesReducer,
  form: formReducer
});

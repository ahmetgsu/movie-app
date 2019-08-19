import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  MOVIE_TITLE,
  ERROR_MSG
} from "../actions/types";

const initialState = {
  title: "",
  moviesData: [],
  selectedMovieData: [],
  errorMessage: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        moviesData: action.payload
      };
    case ERROR_MSG:
      return {
        ...state,
        errorMessage: action.payload
      };
    case MOVIE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case FETCH_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovieData: action.payload
      };
    default:
      return state;
  }
}

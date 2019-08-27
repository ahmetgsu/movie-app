import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  MOVIE_TITLE,
  ERROR_MSG,
  TRENDING_MOVIES,
  UPCOMING_MOVIES
} from "../actions/types";

const initialState = {
  title: "",
  moviesData: [],
  selectedMovieData: [],
  trendingMovies: [],
  upcomingMovies: [],
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
    case TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: action.payload
      };
    case UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.payload
      };
    default:
      return state;
  }
}

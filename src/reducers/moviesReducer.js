import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  ERROR_MSG,
  TRENDING_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_ID
  // MOVIE_TITLE
} from "../actions/types";

const initialState = {
  moviesData: null,
  selectedMovieData: null,
  trendingMovies: [],
  upcomingMovies: [],
  errorMessage: "",
  movieId: null
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
    case MOVIE_ID:
      return {
        ...state,
        movieId: action.payload
      };
    // case MOVIE_TITLE:
    //   return {
    //     ...state,
    //     title: action.payload
    //   };
    default:
      return state;
  }
}

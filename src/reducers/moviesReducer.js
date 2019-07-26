import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  MOVIE_TITLE,
  SELECTED_MOVIE_ID,
  RENDER_CONDITION,
  ERROR_MSG
} from "../actions/types";

const initialState = {
  title: "",
  moviesData: [],
  selectedMovieID: "",
  selectedMovieData: [],
  renderCondition: "LANDING_PAGE",
  errorMessage: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        moviesData: action.payload
      };
    case RENDER_CONDITION:
      return {
        ...state,
        renderCondition: action.payload
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
    default:
      return state;
  }
}

import { FETCH_MOVIES, FETCH_SELECTED_MOVIE } from "../actions/types";

const initialState = {
  movies: [],
  movie: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // We're going to add other cases after creating actions
    default:
      return state;
  }
}

import {
  CREATE_MOVIE_RATE,
  DELETE_MOVIE_RATE,
  UPDATE_MOVIE_RATE,
  GET_MOVIE_RATE,
  GET_MOVIES_RATES,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST
} from "../actions/types";
import _ from "lodash";

const initialState = {
  watchlistedNumber: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MOVIE_RATE:
      return { ...state, [action.payload.id]: action.payload };
    // id number is given by our program. Diff from movieId
    case DELETE_MOVIE_RATE:
      return _.omit(state, action.payload);
    // _.omit create a new object without 2nd argument, instead of changing state object
    case UPDATE_MOVIE_RATE:
      return { ...state, [action.payload.id]: action.payload };
    case GET_MOVIE_RATE:
      return { ...state, [action.payload.id]: action.payload };
    case GET_MOVIES_RATES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case ADD_TO_WATCHLIST:
      return {
        ...state,
        watchlistedNumber: action.payload2,
        [action.payload1.id]: action.payload1
      };
    case DELETE_FROM_WATCHLIST:
      return {
        ..._.omit(state, action.payload1.id),
        watchlistedNumber: action.payload2
      };
    default:
      return state;
  }
};

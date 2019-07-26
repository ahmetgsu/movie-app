import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  MOVIE_TITLE,
  SELECTED_MOVIE_ID,
  RENDER_CONDITION,
  ERROR_MSG
} from "./types";
import axios from "axios";

export const buttonClick = movieName => dispatch => {
  dispatch({
    type: MOVIE_TITLE,
    payload: movieName
  });
};

export const fetchMovies = title => dispatch => {
  axios
    .get(`http://www.omdbapi.com/?apikey=bf24a0f8&type=movie&s=${title}`)
    .then(res => {
      if (res.data.Search) {
        const moviesData = res.data.Search;
        dispatch({
          type: FETCH_MOVIES,
          payload: moviesData.slice(0, 10)
        });
        dispatch({
          type: RENDER_CONDITION,
          payload: "MOVIES_LIST"
        });
        dispatch({
          type: ERROR_MSG,
          payload: ""
        });
      } else {
        const errorMessage = res.data.Error;
        dispatch({
          type: ERROR_MSG,
          payload: errorMessage
        });
      }
    })
    .catch(err => {
      console.log("Opps", err.message);
    });
};

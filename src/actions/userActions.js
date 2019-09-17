import movieUserActions from "../apis/movieUserActions";
import axios from "axios";
// import _ from lodash;
import {
  CREATE_MOVIE_RATE,
  DELETE_MOVIE_RATE,
  UPDATE_MOVIE_RATE,
  // GET_MOVIE_RATE,
  // GET_MOVIES_RATES,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST
  // ICON_CLICK
} from "./types";

//USER MOVIE RATE CREATE, UPDATE & DELETE ACTIONS

export const createMovieRate = (movieId, userRate) => async (
  dispatch,
  getState
) => {
  const params = { movieId: movieId, userRate: userRate };
  const { userId } = getState().auth;

  const res1 = await axios.get("http://localhost:5000/movieRates");
  if (res1.data.find(elem => elem.movieId === movieId)) {
    alert("You have already rated this movie");
  } else {
    const res2 = await movieUserActions.post("/movieRates", {
      ...params,
      userId
    });
    dispatch({ type: CREATE_MOVIE_RATE, payload: res2.data });
  }
};

export const updateMovieRate = (movieId, userRate) => async dispatch => {
  console.log("updateMovieRate function invoked");
  const res1 = await movieUserActions.get("/movieRates");
  const movie = res1.data.find(elem => elem.movieId === parseInt(movieId, 10));
  if (movie !== undefined) {
    const params = { userRate: userRate };
    const response = await movieUserActions.patch(
      `/movieRates/${movie.id}`,
      params
    );
    console.log(response);
    dispatch({ type: UPDATE_MOVIE_RATE, payload: response.data });
  }
};

export const deleteMovieRate = movieId => async dispatch => {
  const response1 = await movieUserActions.get("/movieRates");
  const movie = response1.data.find(elem => elem.movieId === movieId);
  if (movie !== undefined) {
    await movieUserActions.delete(`/movieRates/${movie.id}`);
    dispatch({
      type: DELETE_MOVIE_RATE,
      payload: movie.id
    });
  } else {
    return;
  }
};

//USER WATCHLIST CREATE & DELETE ACTIONS

export const addToWatchList = movieId => async (dispatch, getState) => {
  console.log("addToWatchList invoked");
  const params = { movieId: movieId };
  const { userId } = getState().auth;

  const res1 = await axios.get("http://localhost:5000/watchlist");
  if (res1.data.find(elem => elem.movieId === movieId)) {
    alert("This movie is already in your watchlist");
  } else {
    const res2 = await axios.post("http://localhost:5000/watchlist", {
      ...params,
      userId
    });
    const res3 = await axios.get("http://localhost:5000/watchlist");

    dispatch({
      type: ADD_TO_WATCHLIST,
      payload1: res2.data,
      payload2: res3.data.length
    });
  }
};

export const deleteFromWatchList = movieId => async dispatch => {
  const response1 = await axios.get("http://localhost:5000/watchlist");
  const idOfMovie = response1.data.find(elem => elem.movieId === movieId).id;
  await axios.delete(`http://localhost:5000/watchlist/${idOfMovie}`);
  const response2 = await axios.get("http://localhost:5000/watchlist");

  dispatch({
    type: DELETE_FROM_WATCHLIST,
    payload1: idOfMovie,
    payload2: response2.data.length
  });
};

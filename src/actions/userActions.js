import movieUserActions from "../apis/movieUserActions";
import axios from "axios";
// import _ from lodash;
import {
  CREATE_MOVIE_RATE,
  DELETE_MOVIE_RATE,
  UPDATE_MOVIE_RATE,
  GET_MOVIE_RATE,
  GET_MOVIES_RATES,
  ADD_TO_WATCHLIST,
  DELETE_FROM_WATCHLIST
  // ICON_CLICK
} from "./types";

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

export const fetchMoviesRates = () => async dispatch => {
  const response = await movieUserActions.get("/movieRates");

  dispatch({ type: GET_MOVIES_RATES, payload: response.data });
};

export const fetchMovieRate = movieId => async dispatch => {
  const res1 = await movieUserActions.get("/movieRates");
  const id = res1.data.find(elem => elem.movieId === movieId).id;
  if (id) {
    const response = await movieUserActions.get(`/movieRates/${id}`);
    dispatch({
      type: GET_MOVIE_RATE,
      payload1: response.data.userRate,
      payload2: true
    });
  } else {
    return;
  }
};

export const updateMovieRate = (movieId, userRate) => async dispatch => {
  const res1 = await movieUserActions.get("/movieRates");
  if (res1.data.find(elem => elem.movieId === movieId)) {
  }
  const response = await movieUserActions.put(
    `/movieRates/${movieId}`,
    userRate
  );

  dispatch({ type: UPDATE_MOVIE_RATE, payload: response.data });
};

export const deleteMovieRate = movieId => async dispatch => {
  await movieUserActions.delete(`/movieRates/${movieId}`);

  dispatch({ type: DELETE_MOVIE_RATE, payload: movieId });
};

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

  // axios
  //   .all([
  //     await axios.post("http://localhost:5000/watchlist", {
  //       ...params,
  //       userId
  //     }),
  //     await axios.get("http://localhost:5000/watchlist")
  //   ])
  //   .then(
  //     axios.spread((res1, res2) => {
  //       console.log("res1: ", res1, "res2: ", res2);
  //       const watchlistedMovieNumber = res2.data.length;

  //       dispatch({
  //         type: ADD_TO_WATCHLIST,
  //         payload1: res1.data,
  //         payload2: watchlistedMovieNumber
  //       });
  //     })
  //   );
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

// export const addToWatchList = movieId => async (dispatch, getState) => {
//   console.log("addToWatchList invoked");
//   const params = {
//     movieId: movieId
//   };
//   const { userId } = getState().auth;
//   axios
//     .all([
//       await axios.post("http://localhost:5000/watchlist", {
//         ...params,
//         userId
//       }),
//       await axios.get("http://localhost:5000/watchlist")
//     ])
//     .then(
//       axios.spread((res1, res2) => {
//         console.log("res1: ", res1, "res2: ", res2);
//         const watchlistedMovieNumber = res2.data.length;

//         dispatch({
//           type: ADD_TO_WATCHLIST,
//           payload1: res1.data,
//           payload2: watchlistedMovieNumber
//         });
//       })
//     );
// };

// export const iconClicked = (movieId) => {
//   return {
//     type: ICON_CLICK,
//     payload: true
//   };
// };

// export const iconNotClicked = (movieId) => {
//   return {
//     type: ICON_CLICK,
//     payload: false
//   };
// };

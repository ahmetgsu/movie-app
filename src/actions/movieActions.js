import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  ERROR_MSG,
  TRENDING_MOVIES
} from "./types";
import axios from "axios";

export const fetchMovies = title => dispatch => {
  console.log(`fetchMovies function invoked`);
  console.log(title);
  axios
    .get(`http://www.omdbapi.com/?apikey=bf24a0f8&s=${title}`)
    .then(res => {
      if (res.data.Search) {
        const moviesData = res.data.Search;
        dispatch({
          type: FETCH_MOVIES,
          payload: moviesData.slice(0, 10)
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

export const fetchSelectedMovie = imdbID => dispatch => {
  //console.log(`fetchSelectedMovie function invoked`);
  axios.get(`http://www.omdbapi.com/?apikey=bf24a0f8&i=${imdbID}`).then(res => {
    const selectedMovieData = res.data;
    //console.log(selectedMovieData);
    dispatch({
      type: FETCH_SELECTED_MOVIE,
      payload: selectedMovieData
    });
  });
};

export const fetchTrendingMovies = () => dispatch => {
  axios
    .get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=9d59cf1cfa65858ed8a861785ddce025`
    )
    .then(res => {
      const trendingMovies = res.data.results;
      dispatch({
        type: TRENDING_MOVIES,
        payload: trendingMovies
      });
    });
};

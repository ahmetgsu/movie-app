import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  ERROR_MSG,
  TRENDING_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_ID
  // MOVIE_TITLE
} from "./types";
import axios from "axios";

export const selectedMovieId = id => {
  return {
    type: MOVIE_ID,
    payload: id
  };
};

// export const movieTitle = searchTitle => {
//   return {
//     type: MOVIE_TITLE,
//     payload: searchTitle
//   };
// };

export const fetchMovies = title => dispatch => {
  console.log(`fetchMovies invoked`);
  console.log(title);
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
    )
    .then(res => {
      if (res.data.results.length > 0) {
        const moviesData = res.data.results;
        //console.log(moviesData);
        dispatch({
          type: FETCH_MOVIES,
          payload: moviesData
        });
        dispatch({
          type: ERROR_MSG,
          payload: ""
        });
      } else {
        const errorMessage =
          "The keyword is not found in database, Please enter another keyword";
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
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${API_KEY}&append_to_response=videos`
    )
    .then(res => {
      const selectedMovieData = res.data;
      //console.log(selectedMovieData);
      dispatch({
        type: FETCH_SELECTED_MOVIE,
        payload: selectedMovieData
      });
    });
};

export const fetchTrendingMovies = () => dispatch => {
  //console.log("fetchTrendingMovies function invoked");
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then(res => {
      const trendingMovies = res.data.results;
      dispatch({
        type: TRENDING_MOVIES,
        payload: trendingMovies
      });
    });
};

export const fetchUpcomingMovies = () => dispatch => {
  //console.log("fetchUpcomingMovies function invoked");
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`
    )
    .then(res => {
      const upcomingMovies = res.data.results;
      dispatch({
        type: UPCOMING_MOVIES,
        payload: upcomingMovies
      });
    });
};

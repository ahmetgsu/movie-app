import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  MOVIE_TITLE,
  ERROR_MSG
} from "./types";
import axios from "axios";

// export const inputChange = movieName => dispatch => {
//   dispatch({
//     type: MOVIE_TITLE,
//     payload: movieName
//   });
// };

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

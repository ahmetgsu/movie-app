import {
  FETCH_MOVIES,
  FETCH_SELECTED_MOVIE,
  ERROR_MSG,
  TRENDING_MOVIES,
  UPCOMING_MOVIES,
  MOVIE_ID,
  FETCH_SELECTED_MOVIE_CREDITS,
  FETCH_SELECTED_MOVIE_REVIEW
} from "./types";
import axios from "axios";

export const selectedMovieId = id => {
  return {
    type: MOVIE_ID,
    payload: id
  };
};

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
  console.log(`fetchSelectedMovie function invoked`);
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${imdbID}?api_key=${API_KEY}&append_to_response=videos,images&language=en-US&include_image_language=en`
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

export const fetchSelectedMovieReview = id => dispatch => {
  console.log(`fetchSelectedMovie function invoked`);
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    )
    .then(res => {
      const selectedMovieReviews = res.data;
      //console.log(selectedMovieData);
      dispatch({
        type: FETCH_SELECTED_MOVIE_REVIEW,
        payload: selectedMovieReviews
      });
    });
};

export const fetchSelectedMovieCredits = imdbID => dispatch => {
  console.log(`fetchSelectedMovie function invoked`);
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${imdbID}/credits?api_key=${API_KEY}`
    )
    .then(res => {
      const selectedMovieCredits = res.data;
      //console.log(selectedMovieCredits);
      dispatch({
        type: FETCH_SELECTED_MOVIE_CREDITS,
        payload: selectedMovieCredits
      });
    });
};

export const fetchTrendingMovies = () => dispatch => {
  //console.log("fetchTrendingMovies function invoked");
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .all([
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=2`
      )
    ])
    .then(
      axios.spread((res1, res2) => {
        const trendingMovies1 = res1.data.results;
        const trendingMovies2 = res2.data.results;
        // console.log("page1", trendingMovies1);
        // console.log("page2", trendingMovies2);
        const trendingMovies = [...trendingMovies1, ...trendingMovies2];
        // console.log("trendingMovies", trendingMovies);
        dispatch({
          type: TRENDING_MOVIES,
          payload: trendingMovies
        });
      })
    );
};

export const fetchUpcomingMovies = () => dispatch => {
  //console.log("fetchUpcomingMovies function invoked");
  const API_KEY = "9d59cf1cfa65858ed8a861785ddce025";
  axios
    .all([
      axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`
      )
    ])
    .then(
      axios.spread((res1, res2) => {
        const upcomingMovies1 = res1.data.results;
        // Somestimes 1999 or 1982 movies on the list
        const upcomingMovies1Filtered = upcomingMovies1.filter(
          item => item.release_date.slice(0, 4) === "2019"
        );
        const upcomingMovies2 = res2.data.results;
        const upcomingMovies2Filtered = upcomingMovies2.filter(
          item => item.release_date.slice(0, 4) === "2019"
        );
        const upcomingMovies = [
          ...upcomingMovies1Filtered,
          ...upcomingMovies2Filtered
        ];
        dispatch({
          type: UPCOMING_MOVIES,
          payload: upcomingMovies
        });
      })
    );
};

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../../actions/movieActions";
import { Grid } from "semantic-ui-react";
import queryString from "query-string";
import MovieListContainer from "./MovieListContainer";
import ErrorMessage from "./ErrorMessage";

const MoviesList = props => {
  let moviesData = useSelector(state => state.movies.moviesData);
  const errorMessage = useSelector(state => state.movies.errorMessage);
  const trendingMovies = useSelector(state => state.movies.trendingMovies);
  const upcomingMovies = useSelector(state => state.movies.upcomingMovies);

  const dispatch = useDispatch();
  const moviesFetch = term => dispatch(fetchMovies(term));
  const fetchTrending = () => dispatch(fetchTrendingMovies());
  const fetchUpcoming = () => dispatch(fetchUpcomingMovies());

  useEffect(() => {
    renderCondition();
    // eslint-disable-next-line
  }, [props.location, props.searchTerm]);

  const renderCondition = () => {
    if ("location" in props) {
      const values = queryString.parse(props.location.search);
      moviesFetch(values.query);
      window.scrollTo(0, 0);
    } else {
      const values = queryString.parse(props.searchTerm);
      switch (values.query) {
        case "trendingMovies":
          fetchTrending();
          window.scrollTo(0, 0);
          break;
        case "upcomingMovies":
          fetchUpcoming();
          window.scrollTo(0, 0);
          break;
        default:
          moviesFetch(values.query);
          window.scrollTo(0, 0);
      }
    }
  };
  // MoviesList created by SearchBar component input
  if ("location" in props) {
    const { search } = props.location;
    if (moviesData === null) {
      return (
        <Grid style={{ marginLeft: "auto", marginRight: "auto", width: "90%" }}>
          Loading...
        </Grid>
      );
    } else if (errorMessage !== "") {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return <MovieListContainer moviesData={moviesData} search={search} />;
    }
  }
  // MoviesList created via Carousels on LandingPage or via an image in MoviesContainer
  else {
    const searchArray = ["trendingMovies", "upcomingMovies"];
    let { searchTerm } = props;
    const values = queryString.parse(searchTerm);

    // values.query comes from MoviesContainer created by a SearchBar input
    if (!searchArray.includes(values.query)) {
      if (moviesData === null) {
        return (
          <Grid
            style={{ marginLeft: "auto", marginRight: "auto", width: "90%" }}
          >
            Loading...
          </Grid>
        );
      } else if (errorMessage !== "") {
        return <ErrorMessage errorMessage={errorMessage} />;
      } else {
        return (
          <MovieListContainer moviesData={moviesData} search={searchTerm} />
        );
      }
    } else {
      // values.query comes from LandingPage component
      moviesData = [
        ...(values.query === "trendingMovies" ? trendingMovies : upcomingMovies)
      ]; //moviesData assigned to related array trendingMovies or upcomingMovies

      return <MovieListContainer moviesData={moviesData} search={searchTerm} />;
    }
  }
};

export default MoviesList;

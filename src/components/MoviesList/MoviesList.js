import React from "react";
import { connect } from "react-redux";
import {
  fetchMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../../actions/movieActions";
import { Grid } from "semantic-ui-react";
import queryString from "query-string";
import MovieListContainer from "./MovieListContainer";
import ErrorMessage from "./ErrorMessage";

class MoviesList extends React.Component {
  componentDidMount() {
    if ("location" in this.props) {
      const values = queryString.parse(this.props.location.search);
      this.props.fetchMovies(values.query);
      window.scrollTo(0, 0);
    } else {
      const values = queryString.parse(this.props.searchTerm);
      switch (values.query) {
        case "trendingMovies":
          this.props.fetchTrendingMovies();
          window.scrollTo(0, 0);
          break;
        case "upcomingMovies":
          this.props.fetchUpcomingMovies();
          window.scrollTo(0, 0);
          break;
        default:
          this.props.fetchMovies(values.query);
          window.scrollTo(0, 0);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if ("location" in this.props) {
      if (this.props.location.search !== prevProps.location.search) {
        const values = queryString.parse(this.props.location.search);
        this.props.fetchMovies(values.query);
        window.scrollTo(0, 0);
      }
    } else {
      if (this.props.searchTerm !== prevProps.searchTerm) {
        const values = queryString.parse(this.props.searchTerm);
        this.props.fetchMovies(values.query);
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    if ("location" in this.props) {
      const { errorMessage, moviesData } = this.props;
      const { search } = this.props.location;

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
          <MovieListContainer
            moviesData={moviesData}
            handleClick={this.handleClick}
            search={search}
          />
        );
      }
    } else {
      const searchArray = ["trendingMovies", "upcomingMovies"];
      let { errorMessage, moviesData, searchTerm } = this.props;
      const values = queryString.parse(searchTerm);

      // checks if values.query comes from SearchBar component or LandingPage component
      if (!searchArray.includes(values.query)) {
        // values.query comes from SearchBar component
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
            <MovieListContainer
              moviesData={moviesData}
              handleClick={this.handleClick}
              search={searchTerm}
            />
          );
        }
      } else {
        // values.query comes from LandingPage component
        moviesData = [...this.props[values.query]]; //moviesData assigned to related array trendingMovies or upcomingMovies
        //console.log("moviesData: ", moviesData);
        return (
          <MovieListContainer
            moviesData={moviesData}
            handleClick={this.handleClick}
            search={searchTerm}
          />
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  moviesData: state.movies.moviesData,
  errorMessage: state.movies.errorMessage,
  trendingMovies: state.movies.trendingMovies,
  upcomingMovies: state.movies.upcomingMovies
});

export default connect(
  mapStateToProps,
  { fetchMovies, fetchTrendingMovies, fetchUpcomingMovies }
)(MoviesList);

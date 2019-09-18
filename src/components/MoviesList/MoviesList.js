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
      //console.log(values.query);
      this.props.fetchMovies(values.query);
      window.scrollTo(0, 0);
    } else {
      //console.log("searchTerm is: ", this.props.searchTerm);
      const values = queryString.parse(this.props.searchTerm);
      //console.log(values.query);
      switch (values.query) {
        case "trendingMovies":
          //console.log("trendingMovies case fired");
          this.props.fetchTrendingMovies();
          window.scrollTo(0, 0);
          break;
        case "upcomingMovies":
          console.log("upcomingMovies case fired");
          this.props.fetchUpcomingMovies();
          window.scrollTo(0, 0);
          break;
        default:
          console.log("default case fired");
          console.log(values.query);
          this.props.fetchMovies(values.query);
          window.scrollTo(0, 0);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if ("location" in this.props) {
      if (this.props.location.search !== prevProps.location.search) {
        console.log("componentDidUpdate invoked,", this.props.location.search);
        const values = queryString.parse(this.props.location.search);
        console.log(values.query);
        this.props.fetchMovies(values.query);
        window.scrollTo(0, 0);
      }
    } else {
      if (this.props.searchTerm !== prevProps.searchTerm) {
        console.log("componentDidUpdate invoked,", this.props.location.search);
        const values = queryString.parse(this.props.searchTerm);
        console.log(values.query);
        this.props.fetchMovies(values.query);
        window.scrollTo(0, 0);
      }
    }
  }

  // handleClick = id => {
  //   console.log(id);
  //   this.props.selectedMovieId(id);
  // };

  render() {
    //console.log(this.props);
    if ("location" in this.props) {
      console.log("location: ", this.props.location);
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
      //console.log("searchTerm: ", this.props.searchTerm);

      const searchArray = ["trendingMovies", "upcomingMovies"];
      let { errorMessage, moviesData, searchTerm } = this.props;
      const values = queryString.parse(searchTerm);
      //console.log(values.query, typeof values.query);
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

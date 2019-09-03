//import "./styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import {
  fetchMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../actions/movieActions";
import { Grid, Image } from "semantic-ui-react";
import _ from "lodash";
import history from "../history";
import queryString from "query-string";

class MoviesList extends React.Component {
  componentDidMount() {
    if ("location" in this.props) {
      const values = queryString.parse(this.props.location.search);
      console.log(values.query);
      this.props.fetchMovies(values.query);
      window.scrollTo(0, 0);
    } else {
      console.log("searchTerm is: ", this.props.searchTerm);
      const values = queryString.parse(this.props.searchTerm);
      console.log(values.query);
      switch (values.query) {
        case "trendingMovies":
          console.log("trendingMovies case fired");
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
    console.log(this.props);
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
      console.log("searchTerm: ", this.props.searchTerm);

      const searchArray = ["trendingMovies", "upcomingMovies"];
      let { errorMessage, moviesData, searchTerm } = this.props;
      const values = queryString.parse(searchTerm);
      console.log(values.query, typeof values.query);
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
        console.log("moviesData: ", moviesData);
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

function MovieListContainer(props) {
  const { moviesData, search } = props;
  console.log(search);
  const sortedMoviesData = moviesData
    .sort((a, b) => b.vote_count - a.vote_count)
    .filter(movie => movie.popularity >= 1.0);

  const newArray = _.chunk(sortedMoviesData, 5);

  return (
    <Grid style={{ marginLeft: "auto", marginRight: "auto", width: "90%" }}>
      {newArray.map((item, index) => (
        <Grid.Row key={index} columns={5}>
          {item.map((elem, index) => (
            <Grid.Column key={index} style={{ textAlign: "center" }}>
              <Image
                fluid
                label={{
                  as: "a",
                  color: "blue",
                  content: `${elem.vote_average}`,
                  icon: "star outline",
                  ribbon: true
                }}
                src={`https://image.tmdb.org/t/p/w185${elem.poster_path}`}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer"
                }}
                onClick={() => {
                  history.push(`/movies/${elem.id}/details${search}`);
                }}
              />
              <h5 style={{ margin: "auto", padding: "20px" }}>{elem.title}</h5>
            </Grid.Column>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  );
}

function ErrorMessage(props) {
  const { errorMessage } = props;
  return (
    <div
      className="ui raised segment"
      style={{
        margin: "auto",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: "20px auto" }}>{errorMessage}</h3>
    </div>
  );
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

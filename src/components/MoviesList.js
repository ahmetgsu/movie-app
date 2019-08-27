//import "./styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import { fetchSelectedMovie } from "../actions/movieActions";
import { Grid, Image } from "semantic-ui-react";
import _ from "lodash";
import history from "../history";

class MoviesList extends React.Component {
  handleClick = id => {
    console.log(id);

    this.props.fetchSelectedMovie(id);
  };

  renderContent = () => {
    const { errorMessage, moviesData } = this.props;
    if (errorMessage === "") {
      return (
        <MovieListContainer
          moviesData={moviesData}
          handleClick={this.handleClick}
        />
      );
    } else {
      return <ErrorMessage errorMessage={errorMessage} />;
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function MovieListContainer(props) {
  const { moviesData, handleClick } = props;
  const sortedMoviesData = moviesData
    .sort((a, b) => b.vote_count - a.vote_count)
    .filter(movie => movie.popularity >= 1.0);
  console.log("sortedMoviesData:", sortedMoviesData);
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
                  handleClick(elem.id);
                  history.push("/movies/container");
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
  errorMessage: state.movies.errorMessage
});

export default connect(
  mapStateToProps,
  { fetchSelectedMovie }
)(MoviesList);

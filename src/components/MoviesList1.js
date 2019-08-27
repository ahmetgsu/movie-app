import "./styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import { fetchSelectedMovie } from "../actions/movieActions";
import { Link } from "react-router-dom";
//import { Pagination } from "semantic-ui-react";

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
  console.log(props);
  const { moviesData, handleClick } = props;
  const sortedMoviesData = moviesData
    .sort((a, b) => b.vote_count - a.vote_count)
    .filter(movie => movie.popularity >= 1.0);
  console.log("sortedMoviesData:", sortedMoviesData);
  return (
    <div>
      <div className="ui container">
        <div
          className="image-list"
          style={{ textAlign: "center", fontSize: "16px" }}
        >
          {sortedMoviesData.map((item, index) => (
            <Link to="/movies/container" key={index}>
              <img
                key={index}
                alt={item.original_title}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                onClick={() => handleClick(item.id)}
              />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
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

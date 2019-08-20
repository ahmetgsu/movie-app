import "../styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import { fetchSelectedMovie } from "../actions/movieActions";
import { Link } from "react-router-dom";

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
  return (
    <div>
      <div className="ui container">
        <div className="image-list">
          {moviesData.map((item, index) => (
            <Link to="/movies/card" key={index}>
              <img
                key={index}
                alt={item.imdbID}
                src={item.Poster}
                onClick={() => handleClick(item.imdbID)}
              />
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
        height: "100px",
        width: "500px",
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

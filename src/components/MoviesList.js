import "../styles/MoviesList.css";
import React from "react";
import { connect } from "react-redux";
import { imageClick } from "../actions/movieActions";

class MoviesList extends React.Component {
  handleClick = id => {
    console.log(id);

    this.props.ImageClick(id);
  };

  render() {
    const { moviesData } = this.props;
    return (
      <div>
        <div className="ui container">
          <div className="image-list">
            {moviesData.map(item => (
              <img
                key={item.imdbID}
                alt={item.imdbID}
                src={item.Poster}
                onClick={() => this.handleClick(item.imdbID)}
              />
            ))}
          </div>
          <p />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesData: state.movies.moviesData
});

export default connect(
  mapStateToProps,
  { imageClick }
)(MoviesList);

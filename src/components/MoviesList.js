import "../styles/MoviesList.css";
import React from "react";

class MoviesList extends React.Component {
  handleClick = id => {
    console.log(id);

    this.props.onImageClick(id);
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

export default MoviesList;

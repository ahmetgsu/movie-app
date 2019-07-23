import React from "react";

class MovieCard extends React.Component {
  componentDidMount() {
    console.log("componentDidMount", this.props);
  }

  render() {
    //console.log(movieData);
    const { movieData } = this.props;
    return (
      <div>
        <div>
          <div className="ui centered card" style={{ width: "500px" }}>
            <div className="image">
              <img src={movieData.Poster} alt="" />
            </div>
            <div className="content">
              <div className="header">{movieData.Title}</div>
              <div className="description">{movieData.Plot}</div>
            </div>
            <div className="content">
              <div className="ui grid">
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>RELEASED</span>
                  <div className="ui divider" />
                  <strong>{movieData.Released}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>IMDB RATING</span>
                  <div className="ui divider" />
                  <strong>{movieData.imdbRating}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>GENRE</span>
                  <div className="ui divider" />
                  <strong>{movieData.Genre}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>RUNTIME</span>
                  <div className="ui divider" />
                  <strong>{movieData.Runtime}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;

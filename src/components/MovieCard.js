import React from "react";

class MovieCard extends React.Component {

  render() {
    const { selectedMovieData } = this.props;
    //const infoArray = ["RELEASED", "IMDB RATING", "GENRE", "RUNTIME"]
    return (
      <div>
        <div>
          <div className="ui centered card" style={{ width: "400px" }}>
            <div className="image">
              <img src={selectedMovieData.Poster} alt="" />
            </div>
            <div className="content">
              <div className="header">{selectedMovieData.Title}</div>
              <div className="description">{selectedMovieData.Plot}</div>
            </div>
            <div className="content">
              <div className="ui grid">
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>RELEASED</span>
                  <div className="ui divider" />
                  <strong>{selectedMovieData.Released}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>IMDB RATING</span>
                  <div className="ui divider" />
                  <strong>{selectedMovieData.imdbRating}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>GENRE</span>
                  <div className="ui divider" />
                  <strong>{selectedMovieData.Genre}</strong>
                </div>
                <div className="ui four wide column">
                  <span style={{ fontSize: "15px" }}>RUNTIME</span>
                  <div className="ui divider" />
                  <strong>{selectedMovieData.Runtime}</strong>
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

// {infoArray.map(item => (
//   <div className="ui four wide column">
//     <span style={{ fontSize: "15px" }}>{item}</span>
//     <div className="ui divider" />
//     <strong>{moviesData.find(elem => elem.toLocaleLowerCase('en-US') === item.toLocaleLowerCase('en-US'))}</strong>
// </div>
// ))}

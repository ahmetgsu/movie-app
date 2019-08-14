import React from "react";
import { connect } from "react-redux";

class MovieCard extends React.Component {
  render() {
    const { selectedMovieData } = this.props;
    const infoArray = ["Released", "Imdb Rating", "Genre", "Runtime"];

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
                {infoArray.map((item, index) => (
                  <div key={index} className="ui four wide column">
                    <span style={{ fontSize: "15px" }}>
                      {item.toUpperCase()}
                    </span>
                    <div className="ui divider" />
                    <strong>
                      {
                        selectedMovieData[
                          item !== "Imdb Rating" ? item : "imdbRating"
                        ]
                      }
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(MovieCard);


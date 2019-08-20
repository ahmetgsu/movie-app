import React from "react";
import { connect } from "react-redux";

class MovieCard extends React.Component {
  render() {
    const { selectedMovieData } = this.props;
    const infoArray = ["Released", "Imdb Rating", "Genre", "Runtime"];

    return (
      <div>
        <div className="ui centered card" style={{ width: "400px" }}>
          <div className="image">
            <img src={selectedMovieData.Poster} alt="" />
          </div>
          <div className="content" style={{ textAlign: "center" }}>
            <div className="header">{selectedMovieData.Title}</div>
            <div className="description">{selectedMovieData.Plot}</div>
          </div>
          <div className="content" style={{ textAlign: "center" }}>
            <div className="ui grid">
              {infoArray.map((item, index) => (
                <div key={index} className="four wide column">
                  <div style={{ fontSize: "15px" }}>{item.toUpperCase()}</div>
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
    );
  }
}

const mapStateToProps = state => ({
  selectedMovieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(MovieCard);

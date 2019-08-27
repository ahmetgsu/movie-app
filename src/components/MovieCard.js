import React from "react";
import { connect } from "react-redux";

class MovieCard extends React.Component {
  render() {
    const { selectedMovieData } = this.props;
    console.log(selectedMovieData);
    const infoArray = ["release_date", "genres", "runtime"];

    return (
      <div>
        <div className="ui centered card" style={{ width: "400px" }}>
          <div className="image">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovieData.poster_path}`}
              alt=""
            />
          </div>
          <div className="content" style={{ textAlign: "center" }}>
            <div className="header">{selectedMovieData.original_title}</div>
            <div className="description">{selectedMovieData.overview}</div>
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
                        item !== "genres"
                          ? item
                          : "{genres.map(item => item.name)}"
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

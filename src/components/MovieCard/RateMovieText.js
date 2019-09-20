import React from "react";
import MovieCardContext from "../../contexts/MovieCardContext";

class RateMovieText extends React.Component {
  static contextType = MovieCardContext;

  render() {
    const { starIndex } = this.context;

    return starIndex === null ? (
      <p style={{ fontSize: "19px" }}>Rate movie</p>
    ) : (
      <>
        <h2 style={{ margin: "0px", fontWeight: "bold" }}>{starIndex}</h2>
        <h4
          style={{
            fontSize: "13px",
            marginTop: "2px",
            marginLeft: "5px"
          }}
        >
          Your Rate
        </h4>
      </>
    );
  }
}

export default RateMovieText;

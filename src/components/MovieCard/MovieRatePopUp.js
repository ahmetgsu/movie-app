import React from "react";
import { connect } from "react-redux";
import {
  createMovieRate,
  updateMovieRate,
  deleteMovieRate
} from "../../actions/userActions";
import MovieCardContext from "../../contexts/MovieCardContext";
import { Popup, Icon, Menu } from "semantic-ui-react";
import _ from "lodash";

class MovieRatePopUp extends React.Component {
  static contextType = MovieCardContext;

  starCondition = (movieId, index) => {
    const { starIndex, handleClickStar } = this.context;
    const { isSignedIn } = this.props;
    return isSignedIn
      ? starIndex === null
        ? (handleClickStar(index), this.props.createMovieRate(movieId, index))
        : (handleClickStar(index), this.props.updateMovieRate(movieId, index))
      : alert("To rate this movie, you need to sign in first");
  };

  render() {
    const {
      handleMouseOver,
      handleMouseOut,
      handleClickTimes,
      isHovered,
      activeIndexRate,
      starIndex
    } = this.context;
    const { movieData } = this.props;
    return (
      <Popup
        flowing
        content={_.times(11, i =>
          i === 0 ? (
            <Icon
              onMouseOver={() => handleMouseOver(i)}
              onMouseOut={handleMouseOut}
              onClick={() => {
                handleClickTimes();
                this.props.deleteMovieRate(movieData.id);
              }}
              name={
                isHovered && activeIndexRate === i
                  ? "times circle outline"
                  : "times circle"
              }
              color={isHovered && activeIndexRate === i ? "red" : null} //if 2 conditions right, it's red, otherwise null
              key={i}
              size="large"
              style={{ marginRight: "10px" }}
            />
          ) : (
            <Icon
              onMouseOver={() => handleMouseOver(i)}
              onMouseOut={handleMouseOut}
              onClick={() => this.starCondition(movieData.id, i)}
              name={isHovered && i <= activeIndexRate ? "star" : "star outline"}
              color={isHovered && i <= activeIndexRate ? "yellow" : null}
              key={i}
              size="large"
              style={{ marginleft: "6px", marginRight: "6px" }}
            />
          )
        )}
        position="left center"
        hoverable
        inverted
        trigger={
          <Menu.Item style={{ margin: "0px" }}>
            <Icon
              name={starIndex === null ? "star outline" : "star"}
              color={starIndex === null ? null : "yellow"}
              size="large"
            />
            {starIndex === null ? (
              <p style={{ fontSize: "19px" }}>Rate movie</p>
            ) : (
              <>
                <h2 style={{ margin: "0px", fontWeight: "bold" }}>
                  {starIndex}
                </h2>
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
            )}
          </Menu.Item>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  movieData: state.movies.selectedMovieData,
  isSignedIn: state.auth.isSignedIn
});

export default connect(
  mapStateToProps,
  { createMovieRate, updateMovieRate, deleteMovieRate }
)(MovieRatePopUp);

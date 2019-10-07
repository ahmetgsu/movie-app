import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import RateMovieText from "./RateMovieText";
import {
  createMovieRate,
  updateMovieRate,
  deleteMovieRate
} from "../../actions/userActions";
import Context from "../../contexts/movieCardContext";
import { Popup, Icon, Menu } from "semantic-ui-react";
import _ from "lodash";

const MovieRatePopUp = () => {
  const context = useContext(Context);
  const { isHovered, activeIndexRate, starIndex, handleClickStar } = context;
  const dispatch = useDispatch();
  const createRate = (id, i) => dispatch(createMovieRate(id, i));
  const updateRate = (id, i) => dispatch(updateMovieRate(id, i));
  const deleteRate = id => dispatch(deleteMovieRate(id));
  const movieData = useSelector(state => state.movies.selectedMovieData);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const starCondition = (movieId, index) => {
    return isSignedIn
      ? starIndex === null
        ? (handleClickStar(index), createRate(movieId, index))
        : (handleClickStar(index), updateRate(movieId, index))
      : alert("To rate this movie, you need to sign in first");
  };

  const popupContent = () => {
    return _.times(11, i =>
      i === 0 ? (
        <Icon
          onMouseOver={() => context.handleMouseOver(i)}
          onMouseOut={context.handleMouseOut}
          onClick={() => {
            context.handleClickTimes();
            deleteRate(movieData.id);
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
          onMouseOver={() => context.handleMouseOver(i)}
          onMouseOut={context.handleMouseOut}
          onClick={() => starCondition(movieData.id, i)}
          name={isHovered && i <= activeIndexRate ? "star" : "star outline"}
          color={isHovered && i <= activeIndexRate ? "yellow" : null}
          key={i}
          size="large"
          style={{ marginleft: "6px", marginRight: "6px" }}
        />
      )
    );
  };

  return (
    <Popup
      flowing
      position="left center"
      hoverable
      inverted
      content={popupContent()}
      trigger={
        <Menu.Item style={{ margin: "0px" }}>
          <Icon
            name={starIndex === null ? "star outline" : "star"}
            color={starIndex === null ? null : "yellow"}
            size="large"
          />
          <RateMovieText />
        </Menu.Item>
      }
    />
  );
};

export default MovieRatePopUp;

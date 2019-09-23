import React, { useReducer } from "react";
import Context from "./movieCardContext";
import movieCardReducer from "./movieCardReducer";
import movieUserActions from "../apis/movieUserActions";
import _ from "lodash";
import {
  VIDEO_BUTTON_CLICK,
  WATCHLIST_ICON_CLICK,
  STAR_CLICK,
  DELETE_MOVIE_RATE_CLICK,
  MODAL_OPEN,
  MODAL_CLOSE,
  MOUSE_OVER,
  MOUSE_OUT,
  CHECK_MOVIE_RATE,
  CHECK_WATCHLIST
} from "./types";

const MovieCardStore = props => {
  const initialState = {
    activeIndex: 0,
    iconClicked: false,
    modalOpen: false,
    isHovered: false,
    activeIndexRate: null,
    starIndex: null,
    isRated: null
  };

  const [state, dispatch] = useReducer(movieCardReducer, initialState);

  const handleClick = videoNumber =>
    dispatch({ type: VIDEO_BUTTON_CLICK, payload: videoNumber });

  const handleIconClick = () => {
    if (state.iconClicked === false) {
      dispatch({ type: WATCHLIST_ICON_CLICK, payload: !state.iconClicked });
    } else {
      dispatch({ type: WATCHLIST_ICON_CLICK, payload: !state.iconClicked });
    }
  };

  const handleClickStar = index => {
    if (state.starIndex === null) {
      dispatch({ type: STAR_CLICK, payload: index });
    } else {
      dispatch({ type: STAR_CLICK, payload: index });
    }
  };

  const handleClickTimes = () => dispatch({ type: DELETE_MOVIE_RATE_CLICK });

  const handleOpen = () => dispatch({ type: MODAL_OPEN });

  const handleClose = () => dispatch({ type: MODAL_CLOSE });

  const handleMouseOver = index =>
    dispatch({ type: MOUSE_OVER, payload: index });

  const handleMouseOut = () => dispatch({ type: MOUSE_OUT });

  const fetchMovieRate = async movieId => {
    // console.log(
    //   "fetchMovieRate from context is invoked with movieId: ",
    //   movieId
    // );
    const res1 = await movieUserActions.get("/movieRates");
    const id = _.find(
      res1.data,
      item => item.movieId === parseInt(movieId, 10)
    );
    if (id !== undefined) {
      const response = await movieUserActions.get(`/movieRates/${id.id}`);
      dispatch({ type: CHECK_MOVIE_RATE, payload: response.data.userRate });
    } else {
      return;
    }
  };

  const watchlistCheck = async movieId => {
    // console.log(
    //   "movieWatchlistCheck from context is invoked with movieId: ",
    //   movieId
    // );
    const res1 = await movieUserActions.get("/watchlist");
    const id = _.find(
      res1.data,
      item => item.movieId === parseInt(movieId, 10)
    );
    if (id !== undefined) {
      dispatch({ type: CHECK_WATCHLIST });
    } else {
      return;
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        handleIconClick,
        handleClick,
        handleClickStar,
        handleClickTimes,
        handleOpen,
        handleClose,
        handleMouseOver,
        handleMouseOut,
        fetchMovieRate,
        watchlistCheck
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default MovieCardStore;

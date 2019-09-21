import React, { useState } from "react";
import Context from "./movieCardContext";
import movieUserActions from "../apis/movieUserActions";
import _ from "lodash";
// import {
//   VIDEO_BUTTON_CLICK,
//   WATCHLIST_ICON_CLICK,
//   STAR_CLICK,
//   DELETE_MOVIE_RATE_CLICK,
//   MODAL_OPEN,
//   MODAL_CLOSE,
//   MOUSE_OVER,
//   MOUSE_OUT,
//   CHECK_MOVIE_RATE,
//   CHECK_WATCHLIST
// } from "./types";

const MovieCardStore = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iconClicked, setIconClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndexRate, setActiveIndexRate] = useState(null);
  const [starIndex, setStarIndex] = useState(null);

  //   const initialState = {
  //     activeIndex: 0,
  //     iconClicked: false,
  //     modalOpen: false,
  //     isHovered: false,
  //     activeIndexRate: null,
  //     starIndex: null,
  //     isRated: null
  //   }

  //   const [state, dispatch] = useReducer(movieCardReducer, initialState);

  // USE WITH JUST HOOKS (WITHOUT REDUCER)
  const handleClick = videoNumber => {
    setActiveIndex(videoNumber);
  };

  // USE WITH REDUCER
  //   const handleClick = videoNumber => dispatch({ type: VIDEO_BUTTON_CLICK, payload: videoNumber })

  // USE WITH JUST HOOKS (WITHOUT REDUCER)
  const handleIconClick = () => {
    if (iconClicked === false) {
      setIconClicked(!iconClicked);
    } else {
      setIconClicked(!iconClicked);
    }
  };

  // USE WITH REDUCER
  //   const handleIconClick = () => {
  //       const { iconClicked } = state;
  //       if (iconClicked === false) {
  //           dispatch({ type: WATCHLIST_ICON_CLICK, payload: !iconClicked });
  //       } else {
  //           dispatch({ type: WATCHLIST_ICON_CLICK, payload: !iconClicked });
  //       }
  //   }

  // USE WITH JUST HOOKS (WITHOUT REDUCER)
  const handleClickStar = index => {
    if (starIndex === null) {
      setStarIndex(index);
    } else {
      setStarIndex(index);
    }
  };

  // USE WITH REDUCER
  //   const handleClickStar = (index) => {
  //       if ( this.state.starIndex === null ) {
  //           dispatch({ type: STAR_CLICK, payload: index })
  //       } else {
  //           dispatch({ type: STAR_CLICK, payload: index })
  //       }
  //   }

  const handleClickTimes = () => {
    setStarIndex(null);
  };

  // USE WITH REDUCER
  //   const handleClickTimes = () => dispatch({ type: DELETE_MOVIE_RATE_CLICK })

  const handleOpen = () => {
    setModalOpen(true);
  };

  // USE WITH REDUCER
  //   const handleOpen = () => dispatch({ type: MODAL_OPEN })

  const handleClose = () => {
    setModalOpen(false);
  };

  // USE WITH REDUCER
  //   const handleClose = () => dispatch({ type: MODAL_CLOSE })

  const handleMouseOver = index => {
    setIsHovered(true);
    setActiveIndexRate(index);
  };

  // USE WITH REDUCER
  //   const handleMouseOver = index => dispatch({ type: MOUSE_OVER, payload: index });

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // USE WITH REDUCER
  //   const handleMouseOut = () => dispatch({ type: MOUSE_OUT });

  const fetchMovieRate = async movieId => {
    console.log(
      "fetchMovieRate from context is invoked with movieId: ",
      movieId
    );
    const res1 = await movieUserActions.get("/movieRates");
    const id = _.find(
      res1.data,
      item => item.movieId === parseInt(movieId, 10)
    );
    if (id !== undefined) {
      const response = await movieUserActions.get(`/movieRates/${id.id}`);
      setStarIndex(response.data.userRate);
    } else {
      return;
    }
  };

  // USE WITH REDUCER
  //   const fetchMovieRate = async movieId => {
  //     console.log(
  //       "fetchMovieRate from context is invoked with movieId: ",
  //       movieId
  //     );
  //     const res1 = await movieUserActions.get("/movieRates");
  //     const id = _.find(
  //       res1.data,
  //       item => item.movieId === parseInt(movieId, 10)
  //     );
  //     if (id !== undefined) {
  //       const response = await movieUserActions.get(`/movieRates/${id.id}`);
  //       dispatch({ type: CHECK_MOVIE_RATE, payload: response.data.userRate })
  //     } else {
  //       return;
  //     }
  //   };

  const movieWatchlistCheck = async movieId => {
    console.log(
      "movieWatchlistCheck from context is invoked with movieId: ",
      movieId
    );
    const res1 = await movieUserActions.get("/watchlist");
    const id = _.find(
      res1.data,
      item => item.movieId === parseInt(movieId, 10)
    );
    if (id !== undefined) {
      setIconClicked(true);
    } else {
      return;
    }
  };

  // USE WITH REDUCER
  //   const movieWatchlistCheck = async movieId => {
  //     console.log(
  //       "movieWatchlistCheck from context is invoked with movieId: ",
  //       movieId
  //     );
  //     const res1 = await movieUserActions.get("/watchlist");
  //     const id = _.find(
  //       res1.data,
  //       item => item.movieId === parseInt(movieId, 10)
  //     );
  //     if (id !== undefined) {
  //       dispatch({ type: CHECK_WATCHLIST });
  //     } else {
  //       return;
  //     }
  //   };

  return (
    <Context.Provider
      value={{
        activeIndex,
        iconClicked,
        modalOpen,
        isHovered,
        activeIndexRate,
        starIndex,
        handleIconClick,
        handleClick,
        handleClickStar,
        handleClickTimes,
        handleOpen,
        handleClose,
        handleMouseOver,
        handleMouseOut,
        fetchMovieRate,
        movieWatchlistCheck
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default MovieCardStore;

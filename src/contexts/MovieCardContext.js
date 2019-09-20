import React from "react";
import movieUserActions from "../apis/movieUserActions";
import _ from "lodash";

const Context = React.createContext();

export class MovieCardStore extends React.Component {
  state = {
    activeIndex: 0,
    iconClicked: false,
    modalOpen: false,
    isHovered: false,
    activeIndexRate: null,
    starIndex: null,
    isRated: null
  };

  handleClick = videoNumber => {
    this.setState({ activeIndex: videoNumber });
  };

  handleIconClick = () => {
    const { iconClicked } = this.state;
    if (iconClicked === false) {
      this.setState({ iconClicked: !iconClicked });
    } else {
      this.setState({ iconClicked: !iconClicked });
    }
  };

  handleClickStar = index => {
    if (this.state.starIndex === null) {
      this.setState({ starIndex: index });
    } else {
      this.setState({ starIndex: index });
    }
  };

  handleClickTimes = () => {
    this.setState({ starIndex: null });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleMouseOver = index => {
    this.setState({ isHovered: true, activeIndexRate: index });
  };

  handleMouseOut = () => {
    this.setState({ isHovered: false });
  };

  fetchMovieRate = async movieId => {
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
      this.setState({ starIndex: response.data.userRate });
    } else {
      return;
    }
  };

  movieWatchlistCheck = async movieId => {
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
      this.setState({ iconClicked: true });
    } else {
      return;
    }
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          handleIconClick: this.handleIconClick,
          handleClick: this.handleClick,
          handleClickStar: this.handleClickStar,
          handleClickTimes: this.handleClickTimes,
          handleOpen: this.handleOpen,
          handleClose: this.handleClose,
          handleMouseOver: this.handleMouseOver,
          handleMouseOut: this.handleMouseOut,
          fetchMovieRate: this.fetchMovieRate,
          movieWatchlistCheck: this.movieWatchlistCheck
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

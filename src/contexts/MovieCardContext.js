import React from "react";
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
          handleMouseOut: this.handleMouseOut
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

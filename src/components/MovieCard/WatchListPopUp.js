import React from "react";
import { connect } from "react-redux";
import { Popup, Icon } from "semantic-ui-react";

const WatchListPopUp = ({ movieData, iconClicked, handleIconClick }) => {
  return (
    <Popup
      content={
        iconClicked === false
          ? "+ Add movie to watchlist"
          : "Movie successfully added to watchlist"
      }
      hoverable
      inverted
      flowing
      position="bottom left"
      style={{
        opacity: 0.9,
        border: "5px #33112c",
        padding: "0.8em",
        fontWeight: "bold"
      }}
      trigger={
        <Icon
          name={iconClicked === false ? "plus square" : "check square"}
          size="huge"
          color={iconClicked === false ? "grey" : "green"}
          link
          onClick={() => handleIconClick(movieData.id)}
        />
      }
    />
  );
};

const mapStateToProps = state => ({
  movieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(WatchListPopUp);

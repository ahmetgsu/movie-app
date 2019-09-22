import React, { useContext } from "react";
import Context from "../../contexts/movieCardContext";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList, deleteFromWatchList } from "../../actions/userActions";
import { Popup, Icon } from "semantic-ui-react";

const WatchListPopUp = () => {
  //Redux related hooks
  const dispatch = useDispatch();
  const addItem = movieId => dispatch(addToWatchList(movieId));
  const deleteItem = movieId => dispatch(deleteFromWatchList(movieId));

  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const movieData = useSelector(state => state.movies.selectedMovieData);

  // Context related hooks
  const context = useContext(Context);
  const { iconClicked, handleIconClick } = context;

  const iconCondition = movieId => {
    return isSignedIn
      ? iconClicked === false
        ? (handleIconClick(), addItem(movieId))
        : (handleIconClick(), deleteItem(movieId))
      : alert("Please sign in first to add movie to your watchlist");
  };

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
          onClick={() => iconCondition(movieData.id)}
        />
      }
    />
  );
};

export default WatchListPopUp;

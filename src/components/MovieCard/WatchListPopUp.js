import React from "react";
import MovieCardContext from "../../contexts/MovieCardContext";
import { connect } from "react-redux";
import { addToWatchList, deleteFromWatchList } from "../../actions/userActions";
import { Popup, Icon } from "semantic-ui-react";

class WatchListPopUp extends React.Component {
  static contextType = MovieCardContext;

  iconCondition = movieId => {
    const { iconClicked, handleIconClick } = this.context;
    const { isSignedIn } = this.props;
    return isSignedIn
      ? iconClicked === false
        ? (handleIconClick(), this.props.addToWatchList(movieId))
        : (handleIconClick(), this.props.deleteFromWatchList(movieId))
      : alert("Please sign in first to add movie to your watchlist");
  };

  render() {
    const { movieData } = this.props;
    const { iconClicked } = this.context;
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
            onClick={e => this.iconCondition(movieData.id)}
          />
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
  { addToWatchList, deleteFromWatchList }
)(WatchListPopUp);

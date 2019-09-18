import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import movieUserActions from "../../apis/movieUserActions";
import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../../actions/movieActions";
import {
  createMovieRate,
  updateMovieRate,
  addToWatchList,
  deleteMovieRate,
  deleteFromWatchList
} from "../../actions/userActions";
import { Grid, Card } from "semantic-ui-react";

import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";

class MovieCard extends React.Component {
  // state will be used to change Movie trailer via buttons
  state = {
    activeIndex: 0,
    iconClicked: false,
    modalOpen: false,
    isHovered: false,
    activeIndexRate: null,
    starIndex: null,
    isRated: null
  };
  // componentDidMount works when a movie is clicked on MovieList
  componentDidMount() {
    //console.log("1-ComponentDidMount invoked,", this.props.movieId);
    this.props.fetchSelectedMovie(this.props.movieId);
    this.props.fetchSelectedMovieCredits(this.props.movieId);
    this.props.fetchSelectedMovieReview(this.props.movieId);
    this.fetchMovieRate(this.props.movieId);
    this.movieWatchlistCheck(this.props.movieId);
  }
  // componentDidUpdate works when a movie is clicked in MovieContainer
  componentDidUpdate(prevProps) {
    if (
      this.props.movieId !== prevProps.movieId ||
      this.props.isSignedIn !== prevProps.isSignedIn
    ) {
      //console.log("2-ComponentDidUpdate invoked,", this.props.movieId);
      this.props.fetchSelectedMovie(this.props.movieId);
      this.props.fetchSelectedMovieCredits(this.props.movieId);
      this.props.fetchSelectedMovieReview(this.props.movieId);
      this.fetchMovieRate(this.props.movieId);
      this.movieWatchlistCheck(this.props.movieId);
      // After render, go to the top of the page
      window.scrollTo(0, 0);
    }
  }

  // MOVE IT TO userActions.js
  fetchMovieRate = async movieId => {
    const { isSignedIn } = this.props;
    console.log(isSignedIn);
    if (isSignedIn) {
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
    } else {
      return null;
    }
  };

  // MOVE IT TO userActions.js
  movieWatchlistCheck = async movieId => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
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
    } else {
      this.setState({ iconClicked: false });
    }
  };

  handleClick = videoNumber => {
    console.log(videoNumber);
    this.setState({ activeIndex: videoNumber });
  };

  handleIconClick = movieId => {
    const { iconClicked } = this.state;
    const { isSignedIn } = this.props;
    console.log(movieId);
    if (isSignedIn) {
      if (iconClicked === false) {
        //console.log("iconClicked: ", iconClicked);
        this.setState({ iconClicked: !iconClicked }, () =>
          this.props.addToWatchList(movieId)
        );
      } else {
        //console.log("iconClicked: ", iconClicked);
        this.setState({ iconClicked: !iconClicked }, () =>
          this.props.deleteFromWatchList(movieId)
        );
      }
    } else {
      alert("Please sign in first to add movie to your watchlist");
    }
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

  handleClickStar = (movieId, index) => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      if (this.state.starIndex === null) {
        this.setState({ starIndex: index });
        this.props.createMovieRate(movieId, index);
      } else {
        this.setState({ starIndex: index });
        this.props.updateMovieRate(movieId, index);
      }
    } else {
      alert("To rate this movie, you need to sign in first");
    }
  };

  handleClickTimes = movieId => {
    console.log(movieId);
    this.setState({ starIndex: null });
    this.props.deleteMovieRate(movieId);
  };

  // handleClickReview = id => {
  //   console.log("Review clicked");
  // };

  render() {
    console.log(this.state.starIndex, this.state.activeIndexRate);
    const {
      selectedMovieData,
      selectedMovieCredits,
      selectedMovieReviews
    } = this.props;
    if (
      selectedMovieData === null ||
      selectedMovieCredits === null ||
      selectedMovieReviews === null
    ) {
      return <div className="ui message">Loading... Please wait</div>;
    } else {
      const cardStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        width: "60%",
        minWidth: "1072px"
      };
      return (
        <Grid>
          <Grid.Row>
            <Card style={cardStyle}>
              <CardHeader
                selectedMovieData={selectedMovieData}
                handleClickRate={this.handleClickRate}
                selectedMovieReviews={selectedMovieReviews}
                iconClicked={this.state.iconClicked}
                handleIconClick={this.handleIconClick}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                open={this.state.modalOpen}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
                isHovered={this.state.isHovered}
                activeIndexRate={this.state.activeIndexRate}
                handleClickStar={this.handleClickStar}
                handleClickTimes={this.handleClickTimes}
                starIndex={this.state.starIndex}
              />
              <CardMedia
                selectedMovieData={selectedMovieData}
                activeIndex={this.state.activeIndex}
                handleClick={this.handleClick}
              />
              <CardDescription selectedMovieData={selectedMovieData} />
              <CardFooter
                selectedMovieCredits={selectedMovieCredits}
                selectedMovieData={selectedMovieData}
              />
            </Card>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  return {
    selectedMovieData: state.movies.selectedMovieData,
    selectedMovieCredits: state.movies.selectedMovieCredits,
    selectedMovieReviews: state.movies.selectedMovieReviews,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSelectedMovie,
    fetchSelectedMovieCredits,
    fetchSelectedMovieReview,
    createMovieRate,
    updateMovieRate,
    deleteMovieRate,
    addToWatchList,
    deleteFromWatchList
  }
)(MovieCard);

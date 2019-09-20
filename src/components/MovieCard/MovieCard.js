import React from "react";
import { connect } from "react-redux";

import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../../actions/movieActions";

import { Grid, Card } from "semantic-ui-react";

import MovieCardContext from "../../contexts/MovieCardContext";
import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";

class MovieCard extends React.Component {
  static contextType = MovieCardContext;

  // componentDidMount works when a movie is clicked on MovieList
  componentDidMount() {
    console.log("1-ComponentDidMount invoked,", this.props.movieId);
    this.props.fetchSelectedMovie(this.props.movieId);
    this.props.fetchSelectedMovieCredits(this.props.movieId);
    this.props.fetchSelectedMovieReview(this.props.movieId);
    this.movieRateCondition(this.props.movieId);
    this.watchListCondition(this.props.movieId);
  }

  // componentDidUpdate works when a movie is clicked in MovieContainer
  componentDidUpdate(prevProps) {
    if (
      this.props.movieId !== prevProps.movieId ||
      this.props.isSignedIn !== prevProps.isSignedIn
    ) {
      console.log("2-ComponentDidUpdate invoked,", this.props.movieId);
      this.props.fetchSelectedMovie(this.props.movieId);
      this.props.fetchSelectedMovieCredits(this.props.movieId);
      this.props.fetchSelectedMovieReview(this.props.movieId);
      this.movieRateCondition(this.props.movieId);
      this.watchListCondition(this.props.movieId);
      // After render, go to the top of the page
      window.scrollTo(0, 0);
    }
  }

  // this is to check if the selected movie has already rated or not
  movieRateCondition = movieId => {
    if (this.props.isSignedIn) {
      this.context.fetchMovieRate(movieId);
    } else {
      return null;
    }
  };

  // this is to check if the selected movie has already added to watchlist or not
  watchListCondition = movieId => {
    if (this.props.isSignedIn) {
      this.context.movieWatchlistCheck(movieId);
    } else {
      this.context.handleIconClick();
    }
  };

  render() {
    const { movieData, credits, reviews } = this.props;
    if (movieData === null || credits === null || reviews === null) {
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
              <CardHeader />
              <CardMedia />
              <CardDescription />
              <CardFooter />
            </Card>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    movieData: state.movies.selectedMovieData,
    credits: state.movies.selectedMovieCredits,
    reviews: state.movies.selectedMovieReviews,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSelectedMovie,
    fetchSelectedMovieCredits,
    fetchSelectedMovieReview
  }
)(MovieCard);

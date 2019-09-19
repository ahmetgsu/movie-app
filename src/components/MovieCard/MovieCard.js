import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import movieUserActions from "../../apis/movieUserActions";

import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../../actions/movieActions";

import { Grid, Card } from "semantic-ui-react";

import { MovieCardStore } from "../../contexts/MovieCardContext";
import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";

class MovieCard extends React.Component {
  // componentDidMount works when a movie is clicked on MovieList
  componentDidMount() {
    console.log("1-ComponentDidMount invoked,", this.props.movieId);
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

  // handleClickReview = id => {
  //   console.log("Review clicked");
  // };

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
          <MovieCardStore>
            <Grid.Row>
              <Card className="movie card" style={cardStyle}>
                <CardHeader />
                <CardMedia />
                <CardDescription />
                <CardFooter />
              </Card>
            </Grid.Row>
          </MovieCardStore>
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

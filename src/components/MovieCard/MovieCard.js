import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Context from "../../contexts/movieCardContext";
import CardHeader from "./CardHeader";
import CardMedia from "./CardMedia";
import CardDescription from "./CardDescription";
import CardFooter from "./CardFooter";
import { Grid, Card } from "semantic-ui-react";
import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../../actions/movieActions";

const MovieCard = ({ movieId }) => {
  const context = useContext(Context);
  const movieData = useSelector(state => state.movies.selectedMovieData);
  const credits = useSelector(state => state.movies.selectedMovieCredits);
  const reviews = useSelector(state => state.movies.selectedMovieReviews);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);

  const dispatch = useDispatch();
  const fetchMovie = id => dispatch(fetchSelectedMovie(id));
  const fetchCredits = id => dispatch(fetchSelectedMovieCredits(id));
  const fetchReview = id => dispatch(fetchSelectedMovieReview(id));

  useEffect(() => {
    fetchMovie(movieId);
    fetchCredits(movieId);
    fetchReview(movieId);
    movieRateCondition(movieId);
    watchListCondition(movieId);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [movieId, isSignedIn]);

  // this is to check if the selected movie has already rated or not
  const movieRateCondition = movieId => {
    isSignedIn && context.fetchMovieRate(movieId);
  };

  // this is to check if the selected movie has already added to watchlist or not
  const watchListCondition = movieId => {
    isSignedIn ? context.watchlistCheck(movieId) : context.handleIconClick();
  };

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
};

export default MovieCard;

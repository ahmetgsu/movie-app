import React from "react";
import MoviesList from "./MoviesList/MoviesList";
import MovieCard from "./MovieCard/MovieCard";
import { Grid } from "semantic-ui-react";

const MoviesContainer = props => {
  //console.log(props);
  return (
    <React.Fragment>
      <MovieCard movieId={props.match.params.movieId} />
      <Grid>
        <Grid.Row>
          <MoviesList searchTerm={props.location.search} />
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default MoviesContainer;

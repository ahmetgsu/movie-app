import React from "react";
import MoviesList from "./MoviesList/MoviesList";
import ParentCard from "./MovieCard/ParentCard";
import { Grid } from "semantic-ui-react";

const MoviesContainer = props => {
  console.log(props);
  return (
    <React.Fragment>
      <ParentCard movieId={props.match.params.movieId} />
      <Grid>
        <Grid.Row>
          <MoviesList searchTerm={props.location.search} />
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default MoviesContainer;

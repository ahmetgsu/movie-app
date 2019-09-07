import React from "react";
import MoviesList from "./MoviesList";
import MovieCard from "./MovieCard";
import { Grid } from "semantic-ui-react";

const MoviesContainer = props => {
  console.log(props);
  return (
    <React.Fragment>
      <MovieCard movieId={props.match.params.id} />
      <Grid>
        <Grid.Row>
          <MoviesList searchTerm={props.location.search} />
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default MoviesContainer;

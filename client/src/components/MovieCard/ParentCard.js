import React from "react";
import MovieCardStore from "../../contexts/MovieCardState";
import MovieCard from "./MovieCard";

const ParentCard = props => {
  return (
    <MovieCardStore>
      <MovieCard movieId={props.movieId} />
    </MovieCardStore>
  );
};

export default ParentCard;

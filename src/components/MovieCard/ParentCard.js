import React from "react";
import { MovieCardStore } from "../../contexts/MovieCardContext";
import MovieCard from "./MovieCard";

const ParentCard = props => {
  console.log(props);
  return (
    <MovieCardStore>
      <MovieCard movieId={props.movieId} />
    </MovieCardStore>
  );
};

export default ParentCard;

import React from "react";
import MoviesList from "./MoviesList";
import MovieCard from "./MovieCard";

const MoviesContainer = () => {
  return (
    <div className="ui grid">
      <div className="ui row">
        <div className="ten wide column">
          <MoviesList />
        </div>
        <div className="six wide column">
          <MovieCard />
        </div>
      </div>
    </div>
  );
};

export default MoviesContainer;

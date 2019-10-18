import React from "react";
import { useSelector } from "react-redux";
import { Card } from "semantic-ui-react";

const CardDescription = () => {
  const movieData = useSelector(state => state.movies.selectedMovieData);
  return (
    <Card.Content>
      <Card.Description style={{ fontSize: "18px" }}>
        {movieData.overview}
      </Card.Description>
    </Card.Content>
  );
};

export default CardDescription;

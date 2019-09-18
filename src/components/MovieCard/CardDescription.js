import React from "react";
import { Card } from "semantic-ui-react";

function CardDescription(props) {
  //console.log(props);
  const { selectedMovieData } = props;
  return (
    <Card.Content>
      <Card.Description style={{ fontSize: "18px" }}>
        {selectedMovieData.overview}
      </Card.Description>
    </Card.Content>
  );
}

export default CardDescription;

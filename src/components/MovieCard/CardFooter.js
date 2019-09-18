import React from "react";
import { Grid, Card } from "semantic-ui-react";

function CardFooter(props) {
  //console.log(props);
  const { selectedMovieCredits /*selectedMovieData*/ } = props;
  return (
    <Card.Content>
      <Grid.Row>
        <strong>Director: </strong>
        {/* to handle error in case of no crew information */}
        {selectedMovieCredits.crew.length !== 0
          ? selectedMovieCredits.crew.find(item => item.job === "Director").name
          : ""}
      </Grid.Row>
      <Grid.Row>
        <strong>Stars: </strong>
        {selectedMovieCredits.cast.slice(0, 5).map((item, index) => (
          <span key={index}>
            <strong>{` ${item.name} `}</strong>
            {index === 4 ? ` as ${item.character}` : ` as ${item.character}, `}
          </span>
        ))}
        <br />
        <span style={{ color: "dodgerblue" }}>
          <strong>See full cast and crew</strong>
          {/* <FullCastModal
              selectedMovieCredits={selectedMovieCredits}
              selectedMovieData={selectedMovieData}
            /> */}
        </span>
      </Grid.Row>
    </Card.Content>
  );
}

export default CardFooter;

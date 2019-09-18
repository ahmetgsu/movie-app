import React from "react";
import { Grid, Card, Image, Embed, Button } from "semantic-ui-react";

function CardMedia(props) {
  //console.log(props);
  const { selectedMovieData, activeIndex, handleClick } = props;
  return (
    <Card.Content>
      <Grid>
        <Grid.Column width={5}>
          <Image
            floated="left"
            src={`https://image.tmdb.org/t/p/w342${selectedMovieData.poster_path}`}
            style={{ margin: "0px", width: "100%" }}
          />
        </Grid.Column>
        <Grid.Column
          width={11}
          verticalAlign="middle"
          style={{ padding: "0px 5px 0px 0px" }}
        >
          <Embed
            id={
              selectedMovieData.videos.results.length === 0
                ? ""
                : selectedMovieData.videos.results[activeIndex].key
            }
            placeholder={`https://image.tmdb.org/t/p/w1280${selectedMovieData.backdrop_path}`}
            source="youtube"
            style={{ width: "100%" }}
            iframe={{ allowFullScreen: true }}
          />
          {selectedMovieData.videos.results
            .slice(
              0,
              selectedMovieData.videos.results.length >= 13
                ? 13
                : selectedMovieData.videos.results.length
            )
            .map((elem, index) => (
              <Button
                content={`${index + 1}`}
                style={{ marginTop: "5px" }}
                size="small"
                key={index}
                onClick={() => handleClick(`${index}`)}
              />
            ))}
        </Grid.Column>
      </Grid>
    </Card.Content>
  );
}

export default CardMedia;

import React from "react";
import history from "../../history";
import { Grid, Image } from "semantic-ui-react";
import _ from "lodash";

const MovieListContainer = ({ moviesData, search }) => {
  const sortedMoviesData = moviesData
    .sort((a, b) => b.vote_count - a.vote_count)
    .filter(movie => movie.popularity >= 1.0);
  const newArray = _.chunk(sortedMoviesData, 5);

  return (
    <Grid
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        width: "90%"
      }}
    >
      {newArray.map((item, index) => (
        <Grid.Row key={index} columns={5}>
          {item.map((elem, index) => (
            <Grid.Column key={index} style={{ textAlign: "center" }}>
              <Image
                fluid
                label={{
                  as: "a",
                  color: "blue",
                  content: `${elem.vote_average}`,
                  icon: "star outline",
                  ribbon: true,
                  size: "big"
                }}
                src={`https://image.tmdb.org/t/p/w342${elem.poster_path}`}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  cursor: "pointer",
                  border: "5px solid #fff"
                }}
                rounded
                bordered
                onClick={() => {
                  history.push(`/movies/${elem.id}/details${search}`);
                }}
              />
              <h3 style={{ margin: "auto", padding: "20px", color: "white" }}>
                {elem.title}
              </h3>
            </Grid.Column>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default MovieListContainer;

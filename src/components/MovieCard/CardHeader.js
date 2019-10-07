import React from "react";
import { useSelector } from "react-redux";
import ReviewModal from "./ReviewModal";
import MovieRatePopUp from "./MovieRatePopUp";
import WatchListPopUp from "./WatchListPopUp";
import dateConversion from "./dateConversion";
import { Grid, Card, Icon, Menu } from "semantic-ui-react";

const CardHeader = () => {
  const movieData = useSelector(state => state.movies.selectedMovieData);
  const movieYear = new Date(movieData.release_date);
  return (
    <Card.Content>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} verticalAlign="middle" textAlign="center">
            <WatchListPopUp />
          </Grid.Column>
          <Grid.Column width={8}>
            <Card.Header>
              <h2>
                {movieData.title} ({movieYear.getFullYear()})
              </h2>
            </Card.Header>
            <br />
            <Card.Meta>
              {movieData.runtime !== null ? `${movieData.runtime} min` : NaN} |{" "}
              {dateConversion(movieData.release_date)} |{" "}
              {movieData.genres.map((item, index) =>
                index === movieData.genres.length - 1
                  ? item.name
                  : `${item.name},  `
              )}
            </Card.Meta>
          </Grid.Column>
          <Grid.Column width={6}>
            <Menu secondary size="large" position="right">
              <Menu.Item style={{ marginLeft: "0px" }}>
                <ReviewModal />
              </Menu.Item>
              <Menu.Item>
                <Icon name="star" size="large" color="yellow" />
                <h2 style={{ marginTop: "15px" }}>{movieData.vote_average}</h2>
                <h4 style={{ marginTop: "2px", marginLeft: "5px" }}> /10</h4>
              </Menu.Item>
              <MovieRatePopUp />
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
};

export default CardHeader;

import React from "react";
import GoogleAuth from "./GoogleAuth";
import { Grid, Icon, Button } from "semantic-ui-react";
import history from "../../history";

function SearchBarHeader(props) {
  const { watchlistedNumber } = props;
  return (
    <Grid style={{ marginBottom: "1px" }}>
      <Grid.Column width={1} verticalAlign="middle">
        <Icon
          name="home"
          size="big"
          color="green"
          onClick={() => history.push("/")}
          link
          inverted
        />
      </Grid.Column>
      <Grid.Column width={2}></Grid.Column>
      <Grid.Column
        verticalAlign="middle"
        width={9}
        style={{ textAlign: "center", fontSize: "2em", color: "white" }}
      >
        <strong>Movie Search</strong>
      </Grid.Column>
      <Grid.Column width={2}>
        <Button
          inverted
          content={
            watchlistedNumber === null
              ? "Watchlist"
              : `Watchlist (${watchlistedNumber})`
          }
          icon="heart"
          floated="right"
          style={{ minWidth: "122px" }}
        />
      </Grid.Column>
      <Grid.Column width={2}>
        <GoogleAuth />
      </Grid.Column>
    </Grid>
  );
}

export default SearchBarHeader;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { watchListCheck } from "../../actions/userActions";
import GoogleAuth from "./GoogleAuth";
import { Grid, Icon, Button } from "semantic-ui-react";
import history from "../../history";

const SearchBarHeader = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const number = useSelector(state => state.userActions.watchlistedNumber);
  const dispatch = useDispatch();
  const checkWatchlist = () => dispatch(watchListCheck());

  useEffect(() => {
    console.log("useEffect fired");
    conditionalRender();
    // eslint-disable-next-line
  }, [isSignedIn]);

  const conditionalRender = () => {
    console.log(isSignedIn);
    isSignedIn ? checkWatchlist() : checkWatchlist();
  };

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
          content={number === null ? "Watchlist" : `Watchlist (${number})`}
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
};

export default SearchBarHeader;

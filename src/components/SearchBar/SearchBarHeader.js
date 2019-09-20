import React from "react";
import { connect } from "react-redux";
import { watchListCheck } from "../../actions/userActions";
import GoogleAuth from "./GoogleAuth";
import { Grid, Icon, Button } from "semantic-ui-react";
import history from "../../history";

class SearchBarHeader extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.watchListCheck();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSignedIn !== prevProps.isSignedIn) {
      if (this.props.isSignedIn) {
        this.props.watchListCheck();
      } else {
        this.props.watchListCheck();
      }
    }
  }

  render() {
    const { watchlistedNumber } = this.props;
    console.log(this.props);
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
}

const mapStateToProps = state => {
  console.log(state);
  return {
    watchlistedNumber: state.userActions.watchlistedNumber,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { watchListCheck }
)(SearchBarHeader);

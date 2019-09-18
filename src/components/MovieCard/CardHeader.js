import React from "react";
import { connect } from "react-redux";
import ReviewModal from "./ReviewModal";
import MovieRatePopUp from "./MovieRatePopUp";
import WatchListPopUp from "./WatchListPopUp";
import dateConversion from "./dateConversion";
import { Grid, Card, Icon, Menu } from "semantic-ui-react";

class CardHeader extends React.Component {
  render() {
    const { movieData } = this.props;
    const movieYear = new Date(movieData.release_date);
    return (
      <Card.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} verticalAlign="middle" textAlign="center">
              <WatchListPopUp
                iconClicked={this.props.iconClicked}
                handleIconClick={this.props.handleIconClick}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Card.Header>
                <h2>
                  {movieData.title} ({movieYear.getFullYear()})
                </h2>
              </Card.Header>
              <br />
              <Card.Meta>
                {`${movieData.runtime} min`} |{" "}
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
                  <ReviewModal
                    handleOpen={this.props.handleOpen}
                    handleClose={this.props.handleClose}
                    open={this.props.open}
                  />
                </Menu.Item>
                <Menu.Item>
                  <Icon name="star" size="large" color="yellow" />
                  <h2 style={{ marginTop: "15px" }}>
                    {movieData.vote_average}
                  </h2>
                  <h4 style={{ marginTop: "2px", marginLeft: "5px" }}> /10</h4>
                </Menu.Item>
                <MovieRatePopUp
                  mouseOver={this.props.handleMouseOver}
                  mouseOut={this.props.handleMouseOut}
                  clickTimes={this.props.handleClickTimes}
                  clickStar={this.props.handleClickStar}
                  isHovered={this.props.isHovered}
                  activeIndexRate={this.props.activeIndexRate}
                  starIndex={this.props.starIndex}
                />
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    );
  }
}

const mapStateToProps = state => ({
  movieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(CardHeader);

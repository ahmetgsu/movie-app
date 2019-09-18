import React from "react";
import { connect } from "react-redux";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  selectedMovieId
} from "../../actions/movieActions";
import { Grid, Button, Container } from "semantic-ui-react";
import TrendingMoviesCarousel from "./TrendingMoviesCarousel";
import UpcomingMoviesCarousel from "./UpcomingMoviesCarousel";

class LandingPage extends React.Component {
  state = {
    activeItemIndexTrending: 0,
    activeItemIndexUpcoming: 0
  };

  handleClick = id => {
    console.log(id);
    this.props.selectedMovieId(id);
  };

  handleButtonClick = name => {
    console.log(name);
  };

  changeActiveItemTrending = activeItemIndexTrending =>
    this.setState({ activeItemIndexTrending });

  changeActiveItemUpcoming = activeItemIndexUpcoming =>
    this.setState({ activeItemIndexUpcoming });

  componentDidMount() {
    this.props.fetchUpcomingMovies();
    this.props.fetchTrendingMovies();
  }

  render() {
    const { trendingMovies, upcomingMovies } = this.props;
    const buttonArray = [
      "Latest Movies",
      "Now Playing",
      "Popular Movies",
      "Top Rated Movies"
    ];
    //console.log(this.props);
    return (
      <Container style={{ width: "80%", minWidth: "1020px" }}>
        <Grid columns="equal" textAlign="center" style={{ marginTop: "10px" }}>
          {buttonArray.map((item, index) => (
            <Grid.Column key={index}>
              <Button
                style={{ color: "#121212", fontSize: "16px" }}
                onClick={e => this.handleButtonClick(item)}
              >
                {item}
              </Button>
            </Grid.Column>
          ))}
        </Grid>
        <br />
        <h3 style={{ color: "white" }}>Trending Movies</h3>
        <TrendingMoviesCarousel
          trendingMovies={trendingMovies}
          changeActiveItem={this.changeActiveItemTrending}
          activeItemIndex={this.state.activeItemIndexTrending}
          handleClick={this.handleClick}
        />

        <br />
        <h3 style={{ color: "white" }}>Upcoming Movies</h3>
        <UpcomingMoviesCarousel
          upcomingMovies={upcomingMovies}
          changeActiveItem={this.changeActiveItemUpcoming}
          activeItemIndex={this.state.activeItemIndexUpcoming}
          handleClick={this.handleClick}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  trendingMovies: state.movies.trendingMovies,
  upcomingMovies: state.movies.upcomingMovies
});

export default connect(
  mapStateToProps,
  { fetchTrendingMovies, fetchUpcomingMovies, selectedMovieId }
)(LandingPage);

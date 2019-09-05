import React from "react";
import { connect } from "react-redux";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../actions/movieActions";
import { selectedMovieId } from "../actions/movieActions";
import history from "../history";
import { Grid, Image, Button } from "semantic-ui-react";
import ItemsCarousel from "react-items-carousel";

class LandingPage extends React.Component {
  state = {
    activeItemIndexTrending: 0,
    activeItemIndexUpcoming: 0
  };

  handleClick = id => {
    console.log(id);
    this.props.selectedMovieId(id);
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
    console.log(this.props);
    return (
      <div className="ui container" style={{ width: "80%" }}>
        <Grid columns="equal" textAlign="center" style={{ marginTop: "10px" }}>
          {buttonArray.map((item, index) => (
            <Grid.Column key={index}>
              <Button>{item}</Button>
            </Grid.Column>
          ))}
        </Grid>

        <br />
        <h3>Trending Movies</h3>
        <TrendingMoviesCarousel
          trendingMovies={trendingMovies}
          changeActiveItem={this.changeActiveItemTrending}
          activeItemIndex={this.state.activeItemIndexTrending}
          handleClick={this.handleClick}
        />

        <br />
        <h3>Upcoming Movies</h3>
        <UpcomingMoviesCarousel
          upcomingMovies={upcomingMovies}
          changeActiveItem={this.changeActiveItemUpcoming}
          activeItemIndex={this.state.activeItemIndexUpcoming}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

function TrendingMoviesCarousel(props) {
  const { trendingMovies, activeItemIndex, changeActiveItem } = props;
  console.log(props);
  const sortedTrendingMovies = trendingMovies
    .filter(movie => movie.popularity > 1 && movie.vote_average >= 5)
    .sort((a, b) => b.vote_average - a.vote_average);
  console.log(sortedTrendingMovies);

  return (
    <ItemsCarousel
      gutter={25}
      activePosition={"center"}
      chevronWidth={60}
      numberOfCards={5}
      slidesToScroll={5}
      outsideChevron={true}
      showSlither={false}
      firstAndLastGutter={false}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={changeActiveItem}
      rightChevron={<i className="big grey angle double right icon"></i>}
      leftChevron={<i className="big grey angle double left icon"></i>}
    >
      {sortedTrendingMovies.map((item, index) => (
        <Grid.Column key={index}>
          <Image
            fluid
            label={{
              as: "a",
              color: "blue",
              content: `${item.vote_average}`,
              icon: "star outline",
              ribbon: true
            }}
            src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
            style={{
              cursor: "pointer"
            }}
            onClick={() => {
              props.handleClick(item.id);
              history.push(`/movies/${item.id}/details?query=trendingMovies`);
            }}
          />
          <br />
          <strong>{item.title}</strong>
        </Grid.Column>
      ))}
    </ItemsCarousel>
  );
}

function UpcomingMoviesCarousel(props) {
  const { upcomingMovies, activeItemIndex, changeActiveItem } = props;
  console.log(props);
  const sortedUpcomingMovies = upcomingMovies
    .filter(movie => movie.popularity > 1)
    .sort((a, b) => b.vote_average - a.vote_average);
  console.log(sortedUpcomingMovies);

  return (
    <ItemsCarousel
      gutter={25}
      activePosition={"center"}
      chevronWidth={60}
      numberOfCards={5}
      slidesToScroll={5}
      outsideChevron={true}
      showSlither={false}
      firstAndLastGutter={false}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={changeActiveItem}
      rightChevron={<i className="big grey angle double right icon"></i>}
      leftChevron={<i className="big grey angle double left icon"></i>}
    >
      {sortedUpcomingMovies.map((item, index) => (
        <Grid.Column key={index}>
          <Image
            fluid
            label={{
              as: "a",
              color: "blue",
              content: `${item.vote_average}`,
              icon: "star outline",
              ribbon: true
            }}
            src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
            style={{
              cursor: "pointer"
            }}
            onClick={() => {
              props.handleClick(item.id);
              history.push(`/movies/${item.id}/details?query=upcomingMovies`);
            }}
          />
          <br />
          <strong>{item.title}</strong>
        </Grid.Column>
      ))}
    </ItemsCarousel>
  );
}

const mapStateToProps = state => ({
  trendingMovies: state.movies.trendingMovies,
  upcomingMovies: state.movies.upcomingMovies
});

export default connect(
  mapStateToProps,
  { fetchTrendingMovies, fetchUpcomingMovies, selectedMovieId }
)(LandingPage);

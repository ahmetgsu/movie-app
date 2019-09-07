import React from "react";
import { connect } from "react-redux";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../actions/movieActions";
import { selectedMovieId } from "../actions/movieActions";
import history from "../history";
import { Grid, Image, Button, Container } from "semantic-ui-react";
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
      <Container style={{ width: "80%" }}>
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

function TrendingMoviesCarousel(props) {
  const { trendingMovies, activeItemIndex, changeActiveItem } = props;
  const sortedTrendingMovies = trendingMovies
    .filter(movie => movie.popularity > 1 && movie.vote_average >= 5)
    .sort((a, b) => b.vote_average - a.vote_average);
  // console.log(sortedTrendingMovies);

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
      rightChevron={
        <i
          className="big angle double right icon"
          style={{ color: "white" }}
        ></i>
      }
      leftChevron={
        <i
          className="big angle double left icon"
          style={{ color: "white" }}
        ></i>
      }
    >
      {sortedTrendingMovies.map((item, index) => (
        <React.Fragment key={index}>
          <Image
            rounded
            label={{
              as: "a",
              color: "blue",
              content: `${item.vote_average}`,
              icon: "star outline",
              ribbon: true,
              size: "big"
            }}
            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
            style={{
              cursor: "pointer",
              border: "5px solid #fff",
              width: "100%"
            }}
            onClick={() => {
              props.handleClick(item.id);
              history.push(`/movies/${item.id}/details?query=trendingMovies`);
            }}
          />
          <h3
            style={{
              color: "white",
              textAlign: "center"
            }}
          >
            {item.title}
          </h3>
        </React.Fragment>
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
      rightChevron={
        <i
          className="big angle double right icon"
          style={{ color: "white" }}
        ></i>
      }
      leftChevron={
        <i
          className="big angle double left icon"
          style={{ color: "white" }}
        ></i>
      }
    >
      {sortedUpcomingMovies.map((item, index) => (
        <React.Fragment key={index}>
          <Image
            rounded
            label={{
              as: "a",
              color: "blue",
              content: `${item.vote_average}`,
              icon: "star outline",
              ribbon: true,
              size: "big"
            }}
            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
            style={{
              cursor: "pointer",
              border: "5px solid #fff"
            }}
            onClick={() => {
              props.handleClick(item.id);
              history.push(`/movies/${item.id}/details?query=upcomingMovies`);
            }}
          />
          <h3
            style={{
              color: "white",
              textAlign: "center"
            }}
          >
            {item.title}
          </h3>
        </React.Fragment>
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

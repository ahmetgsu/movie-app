import React from "react";
import { connect } from "react-redux";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../actions/movieActions";
import { selectedMovieId } from "../actions/movieActions";
import history from "../history";
import { Grid, Image } from "semantic-ui-react";
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
    console.log(this.props);
    return (
      <div className="ui container" style={{ width: "80%" }}>
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
    <div style={{ padding: "0", width: "100%", margin: "0 auto" }}>
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
        rightChevron={<i className="right chevron icon"></i>}
        leftChevron={<i className="left chevron icon"></i>}
      >
        {sortedTrendingMovies.map((item, index) => (
          <Grid key={index}>
            <Grid.Row>
              <Grid.Column>
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
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    props.handleClick(item.id);
                    history.push(
                      `/movies/${item.id}/details?query=trendingMovies`
                    );
                  }}
                />
                <br />
                <strong>{item.title}</strong>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
      </ItemsCarousel>
    </div>
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
    <div style={{ padding: "0", maxWidth: "100%", margin: "0 auto" }}>
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
        rightChevron={<i className="right chevron icon"></i>}
        leftChevron={<i className="left chevron icon"></i>}
      >
        {sortedUpcomingMovies.map((item, index) => (
          <Grid key={index}>
            <Grid.Row>
              <Grid.Column>
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
                    marginLeft: "auto",
                    marginRight: "auto",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    props.handleClick(item.id);
                    history.push(
                      `/movies/${item.id}/details?query=upcomingMovies`
                    );
                  }}
                />
                <br />
                <strong>{item.title}</strong>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
      </ItemsCarousel>
    </div>
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

import React from "react";
import { connect } from "react-redux";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies
} from "../actions/movieActions";
import ItemsCarousel from "react-items-carousel";

class LandingPage extends React.Component {
  state = {
    activeItemIndexTrending: 0,
    activeItemIndexUpcoming: 0
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

    return (
      <div className="ui container">
        <br />
        <h3>Trending Movies</h3>
        <TrendingMoviesCarousel
          trendingMovies={trendingMovies}
          changeActiveItem={this.changeActiveItemTrending}
          activeItemIndex={this.state.activeItemIndexTrending}
        />
        <br />
        <h3>Upcoming Movies</h3>
        <UpcomingMoviesCarousel
          upcomingMovies={upcomingMovies}
          changeActiveItem={this.changeActiveItemUpcoming}
          activeItemIndex={this.state.activeItemIndexUpcoming}
        />
      </div>
    );
  }
}

function TrendingMoviesCarousel(props) {
  const { trendingMovies, activeItemIndex, changeActiveItem } = props;

  const sortedTrendingMovies = trendingMovies
    .filter(movie => movie.popularity > 1 && movie.vote_average >= 5)
    .sort((a, b) => b.vote_average - a.vote_average);
  console.log(sortedTrendingMovies);

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
        {sortedTrendingMovies.map((item, index) => (
          <div
            className="ui fluid image"
            key={index}
            style={{ textAlign: "center", fontSize: "16px" }}
          >
            <div className="ui blue ribbon label">
              <i className="star outline icon" />
              {item.vote_average}
            </div>
            <img
              alt={item.original_title}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              //onClick={() => handleClick(item.imdbID)}
            />
            <br />
            <span>
              <strong>{item.title}</strong>
            </span>
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
}

function UpcomingMoviesCarousel(props) {
  const { upcomingMovies, activeItemIndex, changeActiveItem } = props;

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
          <div
            className="ui fluid image"
            key={index}
            style={{ textAlign: "center", fontSize: "16px" }}
          >
            <div className="ui blue ribbon label">
              <i className="star outline icon" />
              {item.vote_average}
            </div>
            <img
              alt={item.original_title}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              //onClick={() => handleClick(item.imdbID)}
            />
            <br />
            <span>
              <strong>{item.title}</strong>
            </span>
          </div>
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
  { fetchTrendingMovies, fetchUpcomingMovies }
)(LandingPage);

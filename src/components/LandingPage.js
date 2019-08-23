import React from "react";
import { connect } from "react-redux";
import { fetchTrendingMovies } from "../actions/movieActions";
//import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.fetchTrendingMovies();
  }
  render() {
    const { trendingMovies } = this.props;
    const sortedTrendingMovies = trendingMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    console.log(sortedTrendingMovies);
    return (
      <div>
        <div className="ui container">
          <br />
          <h3>Trending Movies</h3>
          <div className="image-list">
            {sortedTrendingMovies.map((item, index) => (
              <div className="ui fluid image" key={index}>
                <div className="ui blue ribbon label">
                  <i className="star outline icon" />
                  {item.vote_average}
                </div>
                <img
                  alt={item.original_title}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  //onClick={() => handleClick(item.imdbID)}
                />
                {item.original_title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trendingMovies: state.movies.trendingMovies
});

export default connect(
  mapStateToProps,
  { fetchTrendingMovies }
)(LandingPage);

// const LandingPage = () => {
//   return (
//     <div
//       className="ui raised segment"
//       style={{
//         margin: "auto",
//         textAlign: "center"
//       }}
//     >
//       <h3 style={{ margin: "20px auto" }}>Please make a search...</h3>
//     </div>
//   );
// };

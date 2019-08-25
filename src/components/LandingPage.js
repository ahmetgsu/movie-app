import React from "react";
import { connect } from "react-redux";
import { fetchTrendingMovies } from "../actions/movieActions";
import ItemsCarousel from "react-items-carousel";

class LandingPage extends React.Component {
  state = {
    activeItemIndex: 0
  };

  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });

  componentDidMount() {
    this.props.fetchTrendingMovies();
  }
  render() {
    const { trendingMovies } = this.props;
    const sortedTrendingMovies = trendingMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    console.log(sortedTrendingMovies);

    // const child = { width: `50em`, height: `100%` };
    // const parent = { width: `60em`, height: `100%` };

    return (
      <div>
        <div className="ui container">
          <br />
          <h3>Trending Movies</h3>
          <ImageMap
            trendingMovies={trendingMovies}
            changeActiveItem={this.changeActiveItem}
            activeItemIndex={this.state.activeItemIndex}
          />
        </div>
      </div>
    );
  }
}

function ImageMap(props) {
  const { trendingMovies, activeItemIndex, changeActiveItem } = props;
  const sortedTrendingMovies = trendingMovies.sort(
    (a, b) => b.vote_average - a.vote_average
  );

  return (
    <div style={{ padding: "0", maxWidth: "100%", margin: "0 auto" }}>
      <ItemsCarousel
        numberOfCards={5}
        slidesToScroll={5}
        outsideChevron={true}
        chevronWidth={40}
        activePosition={"center"}
        gutter={25}
        showSlither={false}
        firstAndLastGutter={false}
        freeScrolling={false}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={changeActiveItem}
        rightChevron={">"}
        leftChevron={"<"}
      >
        {sortedTrendingMovies.map((item, index) => (
          <div
            className="ui fluid image"
            key={index}
            style={{ textAlign: "center", fontSize: "15px" }}
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
              <strong>{item.original_title}</strong>
            </span>
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
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

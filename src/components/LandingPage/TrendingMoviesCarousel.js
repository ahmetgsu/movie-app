import React from "react";
import ItemsCarousel from "react-items-carousel";
import history from "../../history";
import { Image } from "semantic-ui-react";

function TrendingMoviesCarousel(props) {
  const { trendingMovies, activeItemIndex, changeActiveItem } = props;
  const sortedTrendingMovies = trendingMovies
    .filter(movie => movie.popularity > 1 && movie.vote_average >= 5)
    .sort((a, b) => b.vote_average - a.vote_average);

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

export default TrendingMoviesCarousel;

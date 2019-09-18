import React from "react";
import ItemsCarousel from "react-items-carousel";
import history from "../../history";
import { Image } from "semantic-ui-react";

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

export default UpcomingMoviesCarousel;

import React from "react";
import { connect } from "react-redux";
import { Card, Icon, Image, Embed } from "semantic-ui-react";

class MovieCard3 extends React.Component {
  render() {
    const { selectedMovieData } = this.props;
    console.log(selectedMovieData);
    //const infoArray = ["release_date", "genres", "runtime"];

    return (
      <Card>
        <Card.Content>
          <Icon floated="left" name="plus square" />
          <Card.Header>{selectedMovieData.title}</Card.Header>
          <Card.Meta>
            {`${selectedMovieData.runtime} min`} |
            {selectedMovieData.release_date}{" "}
          </Card.Meta>
          <Icon floated="right" name="star outline" />
          {selectedMovieData.vote_average}
        </Card.Content>
        <Card.Content>
          <Image
            floated="left"
            src={`https://image.tmdb.org/t/p/w500${selectedMovieData.poster_path}`}
          />
          <Embed
            id={selectedMovieData.id}
            source="youtube"
            url={`https://www.youtube.com/watch?v=${selectedMovieData.videos.results[0].key}`}
          />
        </Card.Content>
        <Card.Content>
          <Card.Description>{selectedMovieData.overview}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  selectedMovieData: state.movies.selectedMovieData
});

export default connect(mapStateToProps)(MovieCard3);

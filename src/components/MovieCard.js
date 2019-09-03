import React from "react";
import { connect } from "react-redux";
import { fetchSelectedMovie } from "../actions/movieActions";
import { Grid, Card, Icon, Image, Embed, Button } from "semantic-ui-react";

class MovieCard extends React.Component {
  componentDidMount() {
    console.log("1-ComponentDidMount invoked,", this.props.movieId);
    this.props.fetchSelectedMovie(this.props.movieId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      console.log("2-ComponentDidUpdate invoked,", this.props.movieId);
      this.props.fetchSelectedMovie(this.props.movieId);
      // After render, go to the top of the page
      window.scrollTo(0, 0);
    }
  }

  handleClick = key => {
    console.log(key);
    this.props.fetchSelectedMovie(key);
  };

  render() {
    console.log(this.props);
    const { selectedMovieData } = this.props;
    console.log("2", selectedMovieData);
    if (selectedMovieData === null) {
      return <div className="ui message">Loading... Please wait</div>;
    } else {
      console.log("3", selectedMovieData.videos.results);
      return (
        <Card style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}>
          <Card.Content>
            <Grid>
              <Grid.Column width={2} verticalAlign="middle" centered>
                <Icon name="huge grey plus square" />
              </Grid.Column>
              <Grid.Column width={11}>
                <Card.Header>
                  <h2>{selectedMovieData.title}</h2>
                </Card.Header>
                <Card.Meta>
                  {`${selectedMovieData.runtime} min`} |{" "}
                  {dateConversion(selectedMovieData.release_date)} |{" "}
                  {selectedMovieData.genres.map((item, index) =>
                    index === selectedMovieData.genres.length - 1
                      ? item.name
                      : `${item.name},  `
                  )}
                </Card.Meta>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" width={1} centered>
                <Icon name="big yellow star" />
              </Grid.Column>
              <Grid.Column
                verticalAlign="middle"
                width={2}
                centered
                style={{ fontSize: "24px" }}
              >
                {selectedMovieData.vote_average}/10
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <Grid>
              <Grid.Column width={5}>
                <Image
                  floated="left"
                  src={`https://image.tmdb.org/t/p/w342${selectedMovieData.poster_path}`}
                  style={{ margin: "0px" }}
                />
              </Grid.Column>
              <Grid.Column
                width={11}
                verticalAlign="middle"
                style={{ padding: "0px 5px 0px 0px" }}
              >
                <Embed
                  id={
                    selectedMovieData.videos.results.length === 0
                      ? ""
                      : selectedMovieData.videos.results[0].key
                  }
                  source="youtube"
                />
                {selectedMovieData.videos.results
                  .slice(1, selectedMovieData.videos.results.length)
                  .map((elem, index) => (
                    <Button
                      size="small"
                      key={index}
                      onClick={() => this.handleClick(elem.key)}
                    >{`${index + 1}`}</Button>
                  ))}
              </Grid.Column>
            </Grid>
          </Card.Content>
          <Card.Content>
            <Card.Description style={{ fontSize: "18px" }}>
              {selectedMovieData.overview}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    }
  }
}

function dateConversion(date) {
  console.log(date);
  const dateArray = date.split("-");
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };
  return `${Number(dateArray[2])} ${months[dateArray[1]]} ${Number(
    dateArray[0]
  )}`;
}

const mapStateToProps = state => ({
  selectedMovieData: state.movies.selectedMovieData
});

export default connect(
  mapStateToProps,
  { fetchSelectedMovie }
)(MovieCard);

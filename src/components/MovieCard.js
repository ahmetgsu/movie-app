import React from "react";
import { connect } from "react-redux";
//import _ from "lodash";
import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../actions/movieActions";
import {
  Grid,
  Card,
  Icon,
  Image,
  Embed,
  Button,
  Modal,
  Header,
  Container,
  Menu
} from "semantic-ui-react";

class MovieCard extends React.Component {
  // state will be used to change Movie trailer via buttons
  state = {
    activeIndex: 0
  };
  // componentDidMount works when a movie is clicked on MovieList
  componentDidMount() {
    console.log("1-ComponentDidMount invoked,", this.props.movieId);
    this.props.fetchSelectedMovie(this.props.movieId);
    this.props.fetchSelectedMovieCredits(this.props.movieId);
    this.props.fetchSelectedMovieReview(this.props.movieId);
  }
  // componentDidUpdate works when a movie is clicked in MovieContainer
  componentDidUpdate(prevProps) {
    if (this.props.movieId !== prevProps.movieId) {
      console.log("2-ComponentDidUpdate invoked,", this.props.movieId);
      this.props.fetchSelectedMovie(this.props.movieId);
      this.props.fetchSelectedMovieCredits(this.props.movieId);
      this.props.fetchSelectedMovieReview(this.props.movieId);
      // After render, go to the top of the page
      window.scrollTo(0, 0);
    }
  }

  handleClick = videoNumber => {
    console.log(videoNumber);
    this.setState({ activeIndex: videoNumber });
  };

  handleClickRate = () => {};

  // handleClickReview = id => {
  //   console.log("Review clicked");
  // };

  render() {
    console.log(this.props);
    const {
      selectedMovieData,
      selectedMovieCredits,
      selectedMovieReviews
    } = this.props;
    console.log("selectedMovieData: ", selectedMovieData);
    console.log("selectedMovieCredits: ", selectedMovieCredits);

    if (
      selectedMovieData === null ||
      selectedMovieCredits === null ||
      selectedMovieReviews === null
    ) {
      return <div className="ui message">Loading... Please wait</div>;
    } else {
      console.log("3", selectedMovieData.videos.results);
      // const gridRowStyle = {
      //   backgroundImage: `url(https://image.tmdb.org/t/p/w1280${selectedMovieData.backdrop_path})`,
      //   height: "100%",
      //   backgroudPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover"
      // };
      return (
        <Grid>
          <Grid.Row /*style={gridRowStyle}*/>
            <Card
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
                width: "60%",
                minWidth: "1072px"
              }}
            >
              <CardHeader
                selectedMovieData={selectedMovieData}
                handleClickRate={this.handleClickRate}
                selectedMovieReviews={selectedMovieReviews}
              />
              <CardMedia
                selectedMovieData={selectedMovieData}
                activeIndex={this.state.activeIndex}
                handleClick={this.handleClick}
              />
              <CardDescription selectedMovieData={selectedMovieData} />
              <CardFooter
                selectedMovieCredits={selectedMovieCredits}
                selectedMovieData={selectedMovieData}
              />
            </Card>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

function CardHeader(props) {
  //console.log(props);
  const { selectedMovieData, handleClickRate, selectedMovieReviews } = props;
  const movieYear = new Date(selectedMovieData.release_date);
  return (
    <Card.Content>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} verticalAlign="middle">
            <Icon name="bookmark outline" size="huge" color="blue" />
          </Grid.Column>
          <Grid.Column width={8}>
            <Card.Header>
              <h2>
                {selectedMovieData.title} ({movieYear.getFullYear()})
              </h2>
            </Card.Header>
            <br />
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
          <Grid.Column width={6}>
            <Menu secondary size="large" position="right">
              <Menu.Item style={{ marginLeft: "0px" }}>
                <ReviewModal
                  selectedMovieData={selectedMovieData}
                  selectedMovieReviews={selectedMovieReviews}
                />
              </Menu.Item>
              <Menu.Item>
                <Icon name="star" size="large" color="yellow" />
                <h2 style={{ marginTop: "15px" }}>
                  {selectedMovieData.vote_average}
                </h2>
                <h4 style={{ marginTop: "0px", marginLeft: "5px" }}> /10</h4>
              </Menu.Item>
              <Menu.Item
                name="Rate movie"
                icon="star outline"
                onClick={() => handleClickRate()}
                style={{
                  fontSize: "19px",
                  padding: "10px",
                  fontWeight: "bold"
                }}
              />
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
}

function CardMedia(props) {
  //console.log(props);
  const { selectedMovieData, activeIndex, handleClick } = props;
  return (
    <Card.Content>
      <Grid>
        <Grid.Column width={5}>
          <Image
            floated="left"
            src={`https://image.tmdb.org/t/p/w342${selectedMovieData.poster_path}`}
            style={{ margin: "0px", width: "100%" }}
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
                : selectedMovieData.videos.results[activeIndex].key
            }
            placeholder={`https://image.tmdb.org/t/p/w1280${selectedMovieData.backdrop_path}`}
            source="youtube"
            style={{ width: "100%" }}
            iframe={{ allowFullScreen: true }}
          />
          {selectedMovieData.videos.results
            .slice(
              0,
              selectedMovieData.videos.results.length >= 13
                ? 13
                : selectedMovieData.videos.results.length
            )
            .map((elem, index) => (
              <Button
                content={`${index + 1}`}
                style={{ marginTop: "5px" }}
                size="small"
                key={index}
                onClick={() => handleClick(`${index}`)}
              />
            ))}
        </Grid.Column>
      </Grid>
    </Card.Content>
  );
}

function CardDescription(props) {
  console.log(props);
  const { selectedMovieData } = props;
  return (
    <Card.Content>
      <Card.Description style={{ fontSize: "18px" }}>
        {selectedMovieData.overview}
      </Card.Description>
    </Card.Content>
  );
}

function CardFooter(props) {
  console.log(props);
  const { selectedMovieCredits, selectedMovieData } = props;
  return (
    <Card.Content>
      <Grid.Row>
        <strong>Director: </strong>
        {selectedMovieCredits.crew.find(item => item.job === "Director").name}
      </Grid.Row>
      <Grid.Row>
        <strong>Stars: </strong>
        {selectedMovieCredits.cast.slice(0, 5).map((item, index) => (
          <span key={index}>
            <strong>{` ${item.name} `}</strong>
            {index === 4 ? ` as ${item.character}` : ` as ${item.character}, `}
          </span>
        ))}
        <br />
        <span style={{ color: "dodgerblue" }}>
          <strong>See full cast and crew</strong>
          {/* <FullCastModal
            selectedMovieCredits={selectedMovieCredits}
            selectedMovieData={selectedMovieData}
          /> */}
        </span>
      </Grid.Row>
    </Card.Content>
  );
}

function ReviewModal(props) {
  //console.log(props);
  return (
    <Modal
      trigger={<p style={{ cursor: "pointer", fontSize: "19px" }}>Reviews</p>}
    >
      <Modal.Header>{props.selectedMovieData.title} Reviews</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size="large"
          src={`https://image.tmdb.org/t/p/w342${props.selectedMovieData.poster_path}`}
          wrapped
        />
        <Modal.Description>
          {props.selectedMovieReviews.results.map((item, index) => (
            <React.Fragment key={index}>
              <Header as="h3">Author: {item.author}</Header>
              <Container textAlign="justified" style={{ fontSize: "18px" }}>
                {item.content.length > 500
                  ? `${item.content.slice(0, 500)}...`
                  : item.content}
              </Container>
              <br />
              {item.content.length > 500 ? (
                <Container>
                  To read the whole content please visit:{" "}
                  <strong>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </strong>
                </Container>
              ) : null}
            </React.Fragment>
          ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Container></Container>
      </Modal.Actions>
    </Modal>
  );
}

// function FullCastModal(props) {
//   console.log(props);
//   const { selectedMovieCredits, selectedMovieData } = props;
//   return (
//     <Modal trigger={<strong>See full cast and crew</strong>}>
//       <Modal.Header>
//         {selectedMovieData.title} ({selectedMovieData.release_date.slice(0, 4)})
//         <br />
//         Full Cast & Crew
//       </Modal.Header>
//       <Modal.Content image scrolling>
//         <Image
//           size="large"
//           /*src={`https://image.tmdb.org/t/p/w342${props.selectedMovieData.poster_path}`}*/
//           wrapped
//         />
//         <Modal.Description>
//           {selectedMovieCredits.results.map((item, index) => (
//             <React.Fragment key={index}>
//               <Header as="h3">Author: {item.author}</Header>
//               <Container textAlign="justified" style={{ fontSize: "18px" }}>
//                 {item.content.length > 500
//                   ? `${item.content.slice(0, 500)}...`
//                   : item.content}
//               </Container>
//               <br />
//               {item.content.length > 500 ? (
//                 <Container>
//                   To read the whole content please visit:{" "}
//                   <strong>
//                     <a
//                       href={item.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {item.url}
//                     </a>
//                   </strong>
//                 </Container>
//               ) : null}
//             </React.Fragment>
//           ))}
//         </Modal.Description>
//       </Modal.Content>
//       <Modal.Actions>
//         <Container></Container>
//       </Modal.Actions>
//     </Modal>
//   );
// }

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
  selectedMovieData: state.movies.selectedMovieData,
  selectedMovieCredits: state.movies.selectedMovieCredits,
  selectedMovieReviews: state.movies.selectedMovieReviews
});

export default connect(
  mapStateToProps,
  { fetchSelectedMovie, fetchSelectedMovieCredits, fetchSelectedMovieReview }
)(MovieCard);

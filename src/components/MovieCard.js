import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import movieUserActions from "../apis/movieUserActions";
import {
  fetchSelectedMovie,
  fetchSelectedMovieCredits,
  fetchSelectedMovieReview
} from "../actions/movieActions";
import {
  createMovieRate,
  updateMovieRate,
  addToWatchList,
  deleteMovieRate,
  deleteFromWatchList
} from "../actions/userActions";
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
  Menu,
  Popup
} from "semantic-ui-react";

class MovieCard extends React.Component {
  // state will be used to change Movie trailer via buttons
  state = {
    activeIndex: 0,
    iconClicked: false,
    modalOpen: false,
    isHovered: false,
    activeIndexRate: null,
    starIndex: null,
    isRated: null
  };
  // componentDidMount works when a movie is clicked on MovieList
  componentDidMount() {
    //console.log("1-ComponentDidMount invoked,", this.props.movieId);
    this.props.fetchSelectedMovie(this.props.movieId);
    this.props.fetchSelectedMovieCredits(this.props.movieId);
    this.props.fetchSelectedMovieReview(this.props.movieId);
    this.fetchMovieRate(this.props.movieId);
    this.movieWatchlistCheck(this.props.movieId);
  }
  // componentDidUpdate works when a movie is clicked in MovieContainer
  componentDidUpdate(prevProps) {
    if (
      this.props.movieId !== prevProps.movieId ||
      this.props.isSignedIn !== prevProps.isSignedIn
    ) {
      //console.log("2-ComponentDidUpdate invoked,", this.props.movieId);
      this.props.fetchSelectedMovie(this.props.movieId);
      this.props.fetchSelectedMovieCredits(this.props.movieId);
      this.props.fetchSelectedMovieReview(this.props.movieId);
      this.fetchMovieRate(this.props.movieId);
      this.movieWatchlistCheck(this.props.movieId);
      // After render, go to the top of the page
      window.scrollTo(0, 0);
    }
  }

  fetchMovieRate = async movieId => {
    const { isSignedIn } = this.props;
    console.log(isSignedIn);
    if (isSignedIn) {
      const res1 = await movieUserActions.get("/movieRates");
      const id = _.find(
        res1.data,
        item => item.movieId === parseInt(movieId, 10)
      );
      if (id !== undefined) {
        const response = await movieUserActions.get(`/movieRates/${id.id}`);
        this.setState({ starIndex: response.data.userRate });
      } else {
        return;
      }
    } else {
      return null;
    }
  };

  movieWatchlistCheck = async movieId => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      const res1 = await movieUserActions.get("/watchlist");
      const id = _.find(
        res1.data,
        item => item.movieId === parseInt(movieId, 10)
      );
      if (id !== undefined) {
        this.setState({ iconClicked: true });
      } else {
        return;
      }
    } else {
      this.setState({ iconClicked: false });
    }
  };

  handleClick = videoNumber => {
    console.log(videoNumber);
    this.setState({ activeIndex: videoNumber });
  };

  handleIconClick = movieId => {
    const { iconClicked } = this.state;
    const { isSignedIn } = this.props;
    console.log(movieId);
    if (isSignedIn) {
      if (iconClicked === false) {
        //console.log("iconClicked: ", iconClicked);
        this.setState({ iconClicked: !iconClicked }, () =>
          this.props.addToWatchList(movieId)
        );
      } else {
        //console.log("iconClicked: ", iconClicked);
        this.setState({ iconClicked: !iconClicked }, () =>
          this.props.deleteFromWatchList(movieId)
        );
      }
    } else {
      alert("Please sign in first to add movie to your watchlist");
    }
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleMouseOver = index => {
    this.setState({ isHovered: true, activeIndexRate: index });
  };

  handleMouseOut = () => {
    this.setState({ isHovered: false });
  };

  handleClickStar = (movieId, index) => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      if (this.state.starIndex === null) {
        this.setState({ starIndex: index });
        this.props.createMovieRate(movieId, index);
      } else {
        this.setState({ starIndex: index });
        this.props.updateMovieRate(movieId, index);
      }
    } else {
      alert("To rate this movie, you need to sign in first");
    }
  };

  handleClickTimes = movieId => {
    console.log(movieId);
    this.setState({ starIndex: null });
    this.props.deleteMovieRate(movieId);
  };

  // handleClickReview = id => {
  //   console.log("Review clicked");
  // };

  render() {
    console.log(this.state.starIndex, this.state.activeIndexRate);
    const {
      selectedMovieData,
      selectedMovieCredits,
      selectedMovieReviews
    } = this.props;
    if (
      selectedMovieData === null ||
      selectedMovieCredits === null ||
      selectedMovieReviews === null
    ) {
      return <div className="ui message">Loading... Please wait</div>;
    } else {
      const cardStyle = {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        width: "60%",
        minWidth: "1072px"
      };
      return (
        <Grid>
          <Grid.Row>
            <Card style={cardStyle}>
              <CardHeader
                selectedMovieData={selectedMovieData}
                handleClickRate={this.handleClickRate}
                selectedMovieReviews={selectedMovieReviews}
                iconClicked={this.state.iconClicked}
                handleIconClick={this.handleIconClick}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                open={this.state.modalOpen}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
                isHovered={this.state.isHovered}
                activeIndexRate={this.state.activeIndexRate}
                handleClickStar={this.handleClickStar}
                handleClickTimes={this.handleClickTimes}
                starIndex={this.state.starIndex}
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
  const {
    selectedMovieData,
    selectedMovieReviews,
    iconClicked,
    handleIconClick,
    handleOpen,
    handleClose,
    open,
    handleMouseOver,
    handleMouseOut,
    isHovered,
    activeIndexRate,
    handleClickTimes,
    handleClickStar,
    starIndex
  } = props;
  const movieYear = new Date(selectedMovieData.release_date);
  return (
    <Card.Content>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} verticalAlign="middle" textAlign="center">
            <Popup
              content={
                iconClicked === false
                  ? "+ Add movie to watchlist"
                  : "Movie successfully added to watchlist"
              }
              hoverable
              inverted
              flowing
              position="bottom left"
              style={{
                opacity: 0.9,
                border: "5px #33112c",
                padding: "0.8em",
                fontWeight: "bold"
              }}
              trigger={
                <Icon
                  name={iconClicked === false ? "plus square" : "check square"}
                  size="huge"
                  color={iconClicked === false ? "grey" : "green"}
                  link
                  onClick={() => handleIconClick(selectedMovieData.id)}
                />
              }
            />
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
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  open={open}
                />
              </Menu.Item>
              <Menu.Item>
                <Icon name="star" size="large" color="yellow" />
                <h2 style={{ marginTop: "15px" }}>
                  {selectedMovieData.vote_average}
                </h2>
                <h4 style={{ marginTop: "2px", marginLeft: "5px" }}> /10</h4>
              </Menu.Item>
              <Popup
                flowing
                content={_.times(11, i =>
                  i === 0 ? (
                    <Icon
                      onMouseOver={() => handleMouseOver(i)}
                      onMouseOut={handleMouseOut}
                      onClick={() => handleClickTimes(selectedMovieData.id)}
                      name={
                        isHovered && activeIndexRate === i
                          ? "times circle outline"
                          : "times circle"
                      }
                      color={isHovered && activeIndexRate === i ? "red" : null} //if 2 conditions right, it's red, otherwise null
                      key={i}
                      size="large"
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <Icon
                      onMouseOver={() => handleMouseOver(i)}
                      onMouseOut={handleMouseOut}
                      onClick={() => handleClickStar(selectedMovieData.id, i)}
                      name={
                        isHovered && i <= activeIndexRate
                          ? "star"
                          : "star outline"
                      }
                      color={
                        isHovered && i <= activeIndexRate ? "yellow" : null
                      }
                      key={i}
                      size="large"
                      style={{ marginleft: "6px", marginRight: "6px" }}
                    />
                  )
                )}
                position="left center"
                hoverable
                inverted
                trigger={
                  <Menu.Item style={{ margin: "0px" }}>
                    <Icon
                      name={starIndex === null ? "star outline" : "star"}
                      color={starIndex === null ? null : "yellow"}
                      size="large"
                    />
                    {starIndex === null ? (
                      <p style={{ fontSize: "19px" }}>Rate movie</p>
                    ) : (
                      <>
                        <h2 style={{ margin: "0px", fontWeight: "bold" }}>
                          {starIndex}
                        </h2>
                        <h4
                          style={{
                            fontSize: "13px",
                            marginTop: "2px",
                            marginLeft: "5px"
                          }}
                        >
                          Your Rate
                        </h4>
                      </>
                    )}
                  </Menu.Item>
                }
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
  //console.log(props);
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
  //console.log(props);
  const { selectedMovieCredits /*selectedMovieData*/ } = props;
  return (
    <Card.Content>
      <Grid.Row>
        <strong>Director: </strong>
        {/* to handle error in case of no crew information */}
        {selectedMovieCredits.crew.length !== 0
          ? selectedMovieCredits.crew.find(item => item.job === "Director").name
          : ""}
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
  const { handleOpen, handleClose, open } = props;
  return (
    <Modal
      trigger={
        <p onClick={handleOpen} style={{ cursor: "pointer", fontSize: "19px" }}>
          Reviews
        </p>
      }
      open={open}
      onClose={handleClose}
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
        <Button color="red" onClick={handleClose}>
          Close <Icon name="close" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function dateConversion(date) {
  //console.log(date);
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

const mapStateToProps = (state, ownProps) => {
  //console.log(ownProps);
  return {
    selectedMovieData: state.movies.selectedMovieData,
    selectedMovieCredits: state.movies.selectedMovieCredits,
    selectedMovieReviews: state.movies.selectedMovieReviews,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSelectedMovie,
    fetchSelectedMovieCredits,
    fetchSelectedMovieReview,
    createMovieRate,
    updateMovieRate,
    deleteMovieRate,
    addToWatchList,
    deleteFromWatchList
  }
)(MovieCard);

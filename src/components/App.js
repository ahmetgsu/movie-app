import React from "react";

import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";

import { connect } from "react-redux";

class App extends React.Component {
  // state = {
  //   title: ""
  //   moviesData: [],
  //   selectedMovieID: "",
  //   selectedMovieData: [],
  //   renderCondition: "LANDING_PAGE",
  //   errorMessage: ""
  // };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.title) {
  //     this.props.fetchMovies(nextProps.title);
  //   }
  // }

  // onButtonClick = movieName => {
  //   this.props.buttonClick(movieName);
  // };

  // onImageClick = id => {
  //   console.log(id);
  //   this.setState({ selectedMovieID: id }, () => this.getMovieDetailedData());
  // };

  // getMovieDetailedData = () => {
  // axios
  //   .get(
  //     `http://www.omdbapi.com/?apikey=bf24a0f8&i=${
  //       this.state.selectedMovieID
  //     }`
  //   )
  //   .then(res => {
  //     console.log(res.data);
  //     const selectedMovieData = res.data;

  //     this.setState({
  //       selectedMovieData,
  //       renderCondition: "MOVIE_CARD"
  //     });
  //   });
  // };

  // // getMoviesData = name => {

  // // };

  renderContent = () => {
    const { renderCondition, errorMessage } = this.props;
    if (renderCondition === "LANDING_PAGE" && !errorMessage) {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div
            className="ui raised segment"
            style={{
              height: "100px",
              width: "500px",
              margin: "auto",
              textAlign: "center"
            }}
          >
            <h3 style={{ margin: "20px auto" }}>Please make a search...</h3>

            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (renderCondition === "MOVIES_LIST") {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <MoviesList />
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (renderCondition === "MOVIE_CARD") {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div
            className="ui center aligned container"
            style={{ margin: "15px" }}
          >
            <div className="ui grid">
              <div className="ui centered card" style={{ width: "400px" }}>
                <div className="content">
                  <MovieCard />
                </div>
              </div>
            </div>
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (errorMessage) {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div
            className="ui raised segment"
            style={{
              height: "100px",
              width: "500px",
              margin: "auto",
              textAlign: "center"
            }}
          >
            <h3 style={{ margin: "20px auto" }}>{errorMessage}</h3>

            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({
  renderCondition: state.movies.renderCondition,
  errorMessage: state.movies.errorMessage
});

export default connect(mapStateToProps)(App);

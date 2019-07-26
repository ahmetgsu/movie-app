import React from "react";
import { Provider } from "react-redux";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import axios from "axios";
import store from "../store";
import { fetchMovies, buttonClick } from "../actions/movieActions";
import { connect } from "http2";

class App extends React.Component {
  // state = {
  //   title: ""
  //   moviesData: [],
  //   selectedMovieID: "",
  //   selectedMovieData: [],
  //   renderCondition: "LANDING_PAGE",
  //   errorMessage: ""
  // };

  // onButtonClick = movieName => {
  //   this.props.buttonClick(movieName) () => this.getMoviesData());
  // };

  onImageClick = id => {
    console.log(id);
    this.setState({ selectedMovieID: id }, () => this.getMovieDetailedData());
  };

  getMovieDetailedData = () => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=bf24a0f8&i=${
          this.state.selectedMovieID
        }`
      )
      .then(res => {
        console.log(res.data);
        const selectedMovieData = res.data;

        this.setState({
          selectedMovieData,
          renderCondition: "MOVIE_CARD"
        });
      });
  };

  getMoviesData = () => {
    this.props.fetchMovies();
  };

  renderContent = () => {
    if (
      this.state.renderCondition === "LANDING_PAGE" &&
      !this.state.errorMessage
    ) {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar
                    onButtonClick={this.onButtonClick}
                    title={this.state.title}
                  />
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
    if (this.state.renderCondition === "MOVIES_LIST") {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar
                    onButtonClick={this.onButtonClick}
                    title={this.state.title}
                  />
                </div>
              </div>
            </div>
          </div>
          <MoviesList
            moviesData={this.state.moviesData}
            onImageClick={this.onImageClick}
          />
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (this.state.renderCondition === "MOVIE_CARD") {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar
                    onButtonClick={this.onButtonClick}
                    title={this.state.title}
                  />
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
                  <MovieCard selectedMovieData={this.state.selectedMovieData} />
                </div>
              </div>
            </div>
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (this.state.errorMessage) {
      return (
        <div style={{ margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar
                    onButtonClick={this.onButtonClick}
                    title={this.state.title}
                  />
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
            <h3 style={{ margin: "20px auto" }}>{this.state.errorMessage}</h3>

            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
  };

  render() {
    return (
      <Provider store={store}>
        <div>{this.renderContent()}</div>
      </Provider>
    );
  }
}

// const mapStateToProps = state => {
//   movies: state.movies.moviesData,
// }

export default connect(
  null,
  { fetchMovies, buttonClick }
)(App);

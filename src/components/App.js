import React from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import axios from "axios";
//import getMovies from '../apis/getMovies'

class App extends React.Component {
  state = {
    title: "",
    moviesData: [],
    selectedMovieID: "",
    selectedMovieData: [],
    renderCondition: "landing page",
    errorMessage: ""
  };

  onButtonClick = movieName => {
    console.log(movieName);
    this.setState({ title: movieName }, () => this.getMoviesData());
  };

  onImageClick = id => {
    console.log(id);
    this.setState({ selectedMovieID: id }, () => this.getMovieDetailedData());
  };

  // This function is for fetching detailed info of selected movie
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
          renderCondition: "movie card"
        });
      });
  };

  // This function is for fetching movies data according to the searching term
  getMoviesData = () => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=bf24a0f8&type=movie&s=${
          this.state.title
        }`
      )
      .then(res => {
        console.log(res.data.Search);
        if (res.data.Search) {
          const moviesData = res.data.Search;
          //console.log(moviesData.slice(0,9))
          this.setState({
            moviesData: moviesData.slice(0, 10),
            renderCondition: "movies list"
          });
        } else {
          console.log(res.data.Error);
          const errorMessage = res.data.Error;
          this.setState({ errorMessage });
        }
      })
      .catch(err => {
        console.log("Opps", err.message);
      });
  };

  renderContent = () => {
    if (
      this.state.renderCondition === "landing page" &&
      !this.state.errorMessage
    ) {
      return (
        <div style={{ backgroundColor: "#f1f8ff", margin: "15px" }}>
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
            <h3 style={{ margin: "auto" }}>Please make a search...</h3>

            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
    if (this.state.renderCondition === "movies list") {
      return (
        <div style={{ backgroundColor: "#f1f8ff", margin: "15px" }}>
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
    if (this.state.renderCondition === "movie card") {
      return (
        <div style={{ backgroundColor: "#f1f8ff", margin: "15px" }}>
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
        <div style={{ backgroundColor: "#f1f8ff", margin: "15px" }}>
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
            <h3 style={{ margin: "auto" }}>{this.state.errorMessage}</h3>

            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    }
  };

  render() {
    console.log(this.state);
    return <div>{this.renderContent()}</div>;
  }
}

export default App;

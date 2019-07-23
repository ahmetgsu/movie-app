import React from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import axios from "axios";
//import getMovies from '../apis/getMovies'

class App extends React.Component {
  state = {
    title: "",
    moviesData: []
  };

  onButtonClick = movieName => {
    console.log(movieName);
    this.setState({ title: movieName }, () => this.getMoviesData());
  };

  getMovieDetailedData = () => {
    axios
      .get(`http://www.omdbapi.com/?apikey=bf24a0f8&t=${this.state.title}`)
      .then(res => {
        //console.log(res.data);
        const movieData = res.data.Search;

        this.setState({ movieData });
      });
  }

  getMoviesData = () => {
    axios
      .get(`http://www.omdbapi.com/?apikey=bf24a0f8&s=${this.state.title}`)
      .then(res => {
        console.log(res.data.Search);
        const moviesData = res.data.Search;
        //console.log(moviesData.slice(0,9))
        this.setState({ moviesData: moviesData.slice(0,9) });
      });
  };

  renderContent = () => {
    if (this.state.title === "") {
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
            className="ui segment"
            style={{ height: "100px", width: "500px", margin: "auto" }}
          >
            <div className="content">
              Please make a search...
            </div>
            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    } 
    if (this.state.title) { 
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
          <div className="ui container" style={{ margin: "auto" }}>
            <div className="ui five column grid">
            {this.state.moviesData.map(item => (    
              <img alt={item.imdbID} src={item.Poster}></img>
            ))}
            </div>
            <p />
          </div>
          <div className="ui container">Copyright, 2019</div>
        </div>
      );
    } else {
      return (
        <div style={{ backgroundColor: "#f1f8ff", margin: "15px" }}>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar onButtonClick={this.onButtonClick}
                    title={this.state.title}/>
                </div>
              </div>
            </div>
          </div>
          <div
            className="ui center aligned container"
            style={{ margin: "15px" }}
          >
            <div className="ui grid">
              <div className="ui centered card" style={{ width: "500px" }}>
                <div className="content">
                  <MovieCard moviesData={this.state.moviesData} />
                </div>
              </div>
            </div>
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

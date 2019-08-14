import React from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import { connect } from "react-redux";

class App extends React.Component {
  renderContent = () => {
    const today = new Date();
    const year = today.getFullYear();
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
          <div
            className="ui container"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Copyright &copy; {year}
          </div>
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
          <div
            className="ui container"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Copyright &copy; {year}
          </div>
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
          <div
            className="ui container"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Copyright &copy; {year}>
          </div>
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
          <div
            className="ui container"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Copyright &copy; {year}
          </div>
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

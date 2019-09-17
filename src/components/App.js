import React, { createRef } from "react";
import { Router, Route } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import history from "../history";
import { Sticky } from "semantic-ui-react";

class App extends React.Component {
  contextRef = createRef();

  render() {
    return (
      <div
        className="ui container"
        style={{ width: "100%" }}
        ref={this.contextRef}
      >
        <Router history={history}>
          <div>
            <Sticky context={this.contextRef}>
              <SearchBar />
            </Sticky>
            <Route path="/" exact component={LandingPage} />
            <Route path="/movies/list" component={MoviesList} />
            <Route
              path="/movies/:movieId/details"
              component={MoviesContainer}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

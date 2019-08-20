import React from "react";
import { Router, Route } from "react-router-dom";
import MoviesContainer from "./MoviesContainer";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import history from "../history";

const App = () => {
  return (
    <div className="ui container" style={{ margin: "15px" }}>
      <Router history={history}>
        <div>
          <SearchBar />
          <Route path="/" exact component={LandingPage} />
          <Route path="/movies/list" exact component={MoviesList} />
          <Route path="/movies/container" exact component={MoviesContainer} />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

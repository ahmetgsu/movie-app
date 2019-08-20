import React from "react";
import { Router, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import history from "../history";

const App = () => {
  return (
    <div style={{ margin: "15px" }}>
      <Router history={history}>
        <div>
          <div className="ui container">
            <div className="ui grid" style={{ margin: "15px" }}>
              <div className="centered row">
                <div className="ui input focus">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <Route path="/" exact component={LandingPage} />
          <Route path="/movies/list" exact component={MoviesList} />
          <Route path="/movies/card" exact component={MovieCard} />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <div style={{ margin: "15px" }}>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
};

export default App;

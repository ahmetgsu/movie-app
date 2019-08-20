import React from "react";
import { connect } from "react-redux";
import { inputChange, fetchMovies } from "../actions/movieActions";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value }, () =>
      this.props.inputChange(this.state.searchTerm)
    );
  };

  handleClick = () => {
    //console.log(`Button clicked and movie title is ${this.props.title}`);

    this.props.fetchMovies(this.props.title);
  };

  render() {
    //console.log("this.state.searchTerm :", this.state.searchTerm);
    return (
      <div className="search-bar ui segment" style={{ width: "500px" }}>
        <label>
          <h3>Movie Search</h3>
        </label>
        <br />
        <div className="ui action fluid input focus">
          <input
            type="text"
            value={this.state.searchTerm}
            placeholder="Search by movie title"
            onChange={e => this.handleChange(e)}
          />
          <Link to="/movies/list">
            <button
              className="ui positive button"
              onClick={e => this.handleClick(e)}
            >
              Search
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: state.movies.title,
  errorMessage: state.movies.errorMessage
});

export default connect(
  mapStateToProps,
  { inputChange, fetchMovies }
)(SearchBar);

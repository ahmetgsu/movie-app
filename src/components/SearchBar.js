import React from "react";

class SearchBar extends React.Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
    //this.props.onInputChange(e.target.value);
  };

  handleClick = e => {
    e.preventDefault();

    this.props.onButtonClick(this.state.searchTerm);
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
          <button
            className="ui positive button"
            onClick={e => this.handleClick(e)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;

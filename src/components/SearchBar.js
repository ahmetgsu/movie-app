import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../actions/movieActions";
//import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import history from "../history";
import GoogleAuth from "./GoogleAuth";

class SearchBar extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, meta }) => {
    // console.log(input);
    const className = `ui fluid input ${
      meta.error && meta.touched ? "error" : ""
    }`;

    return (
      <div>
        <div className={className}>
          <input
            {...input}
            autoComplete="off"
            placeholder="Search by movie title"
          />
          <button
            className="ui positive button"
            onClick={() =>
              `${
                meta.error && meta.touched
                  ? history.push("/")
                  : history.push("/movies/list")
              }`
            }
          >
            Search
          </button>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);

    this.props.fetchMovies(formValues.movieTitle);
  };

  render() {
    // console.log(this.props);
    return (
      <div className="search-bar ui segment">
        <SearchBarHeader />
        <br />
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="movieTitle" component={this.renderInput} />
        </form>
      </div>
    );
  }
}

function SearchBarHeader(props) {
  return (
    <div className="ui grid">
      <div className="four wide column" />
      <div className="eight wide column">
        <div style={{ textAlign: "center", fontSize: "1.5em" }}>
          <strong>Movie Search</strong>
        </div>
      </div>
      <div className="four wide column">
        <GoogleAuth />
      </div>
    </div>
  );
}

const validate = formValue => {
  //console.log(formValue);
  const error = {};

  if (!formValue.movieTitle) {
    error.movieTitle = "Please enter a movie title...";
  }

  return error;
};

const formInput = reduxForm({
  form: "movieSearch",
  validate
})(SearchBar);

export default connect(
  null,
  { fetchMovies }
)(formInput);

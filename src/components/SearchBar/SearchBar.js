import React from "react";
import { connect } from "react-redux";
import { fetchMovies } from "../../actions/movieActions";
import { Field, reduxForm } from "redux-form";
import history from "../../history";
import SearchBarHeader from "./SearchBarHeader";
import { Segment, Form } from "semantic-ui-react";

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
            style={{ backgroundColor: "grey" }}
          />
          <button
            className="ui positive button"
            onClick={() => {
              return meta.error && meta.touched
                ? history.push("/")
                : history.push(`/movies/list?query=${input.value}`);
            }}
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
    history.push(`/movies/list?query=${formValues.movieTitle}`);
  };

  render() {
    const { watchlistedNumber } = this.props;
    return (
      <Segment
        style={{
          width: "100%",
          zIndex: "2",
          backgroundColor: "#333",
          minWidth: "960px"
        }}
      >
        <SearchBarHeader watchlistedNumber={watchlistedNumber} />
        <Form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="movieTitle" component={this.renderInput} />
        </Form>
      </Segment>
    );
  }
}

const validate = formValue => {
  //console.log(formValue);
  const error = {};

  if (!formValue.movieTitle) {
    error.movieTitle = "Please enter a movie title...";
  }

  return error;
};

const mapStateToProps = state => {
  //console.log("state.userActions: ", state.userActions);
  return {
    watchlistedNumber: state.userActions.watchlistedNumber
  };
};

const formInput = reduxForm({
  form: "movieSearch",
  destroyOnUnmount: false,
  validate
})(SearchBar);

export default connect(
  mapStateToProps,
  { fetchMovies }
)(formInput);
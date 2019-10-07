import React from "react";
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
    return (
      <Segment
        style={{
          width: "100%",
          zIndex: "2",
          backgroundColor: "#333",
          minWidth: "960px"
        }}
      >
        <SearchBarHeader />
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

export default reduxForm({
  form: "movieSearch",
  destroyOnUnmount: false,
  validate
})(SearchBar);

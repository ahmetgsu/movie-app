import React from 'react';
import { Field, reduxForm } from 'redux-form';
import history from '../../history';
import { Form, Input, Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, meta }) => {
    const className = `ui fluid input ${
      meta.error && meta.touched ? 'error' : ''
    }`;

    return (
      <div>
        <div className={className}>
          <Input
            {...input}
            autoComplete='off'
            placeholder='Search by movie title'
            action={
              <Button
                color='green'
                content='Search'
                icon='search'
                onClick={() => {
                  return meta.error && meta.touched
                    ? history.push('/')
                    : history.push(`/movies/list?query=${input.value}`);
                }}
              />
            }
          />
        </div>
        {/* {this.renderError(meta)} */}
      </div>
    );
  };

  onSubmit = formValues => {
    console.log(formValues);
    history.push(`/movies/list?query=${formValues.movieTitle}`);
  };

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field name='movieTitle' component={this.renderInput} />
      </Form>
    );
  }
}

const validate = formValue => {
  //console.log(formValue);
  const error = {};

  if (!formValue.movieTitle) {
    error.movieTitle = 'Please enter a movie title...';
  }

  return error;
};

export default reduxForm({
  form: 'movieSearch',
  destroyOnUnmount: false,
  validate
})(SearchBar);

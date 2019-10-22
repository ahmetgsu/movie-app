import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register, clearErrors } from '../../actions/authActions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Alerts from '../Alerts';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const alertMessage = (msg, type, id) => dispatch(setAlert(msg, type, id));
  const userRegister = formData => dispatch(register(formData));
  const errorClear = () => dispatch(clearErrors());

  const error = useSelector(state => state.auth.error);

  useEffect(
    () => {
      // if (isAuthenticated) {
      //   props.history.push('/');
      // }

      if (error === 'User already exists') {
        alertMessage(error, 'error');
        errorClear();
      }
      // eslint-disable-next-line
    },
    [error /*isAuthenticated, props.history*/]
  );

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // Validation for error
    if (username === '' || email === '' || password === '') {
      alertMessage('Please enter all fields', 'error');
    } else if (password !== password2) {
      alertMessage('Passwords do not match', 'error');
    } else if (password.length < 6) {
      alertMessage(
        'Please enter a password with 6 or more characters',
        'error'
      );
    } else {
      userRegister({
        username,
        email,
        password
      });

      alertMessage('Account register succesful', 'positive');
    }
  };

  return (
    <Grid centered style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Alerts />
        <Header as='h2' inverted textAlign='center'>
          Account Register
        </Header>
        <Form size='big' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='text'
              name='username'
              value={username}
              onChange={onChange}
            />
            <Form.Input
              icon='mail'
              iconPosition='left'
              placeholder='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <Form.Input
              icon='lock'
              iconPosition='left'
              placeholder='Confirm Password'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
            />
            <Button color='blue' fluid>
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;

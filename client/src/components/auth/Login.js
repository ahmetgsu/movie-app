import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setAlert } from '../../actions/alertActions';
import GoogleAuth from '../SearchBar/GoogleAuth';
// import Alerts from '../Alerts';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

const LoginForm = () => {
  // const dispatch = useDispatch();
  // const alertMessage = (msg, type, id) => dispatch(setAlert(msg, type, id));

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('Login submit');
  };
  return (
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' inverted textAlign='center'>
          Account Login
        </Header>
        <Form size='large' onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
              value={email}
              onChange={onChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />

            <Button color='blue' fluid size='large'>
              Login
            </Button>
            <br />
            <Form.Field>
              <h4>Quick access with</h4>
              <GoogleAuth />
            </Form.Field>
          </Segment>
        </Form>
        <Message>
          New to us?{' '}
          <Link to='/api/users'>
            <strong>Register</strong>
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;

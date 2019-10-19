import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../SearchBar/GoogleAuth';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='green' textAlign='center'>
        Account Login
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='E-mail address'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
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
        New to us? <Link to='/api/users'>Register</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default LoginForm;

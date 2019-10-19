import React from 'react';
// import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

const RegisterForm = () => (
  <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='green' textAlign='center'>
        Account Register
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input label='Name' type='text' />
          <Form.Input label='Email Address' type='email' />
          <Form.Input label='Password' type='password' />
          <Form.Input label='Confirm Password' type='password' />
          <Button color='green' fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default RegisterForm;

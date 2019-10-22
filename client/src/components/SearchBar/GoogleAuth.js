import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions/authActions';
import { Button, Image } from 'semantic-ui-react';
import google from './google.png';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      //loads library
      window.gapi.client
        .init({
          // initialize the loaded library
          clientId:
            '864593952798-4ie8le2su9ioj0aig6dud19bok0d3600.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance(); //ref to auth library
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Button
          onClick={this.onSignOutClick}
          className='ui floated red google button'
          style={{ minWidth: '115.3px' }}
          content='Sign Out'
          icon='sign out alternate icon'
        />
      );
    } else {
      return (
        <Image src={google} centered size='tiny' onClick={this.onSignInClick} />
        // <Button
        //   onClick={this.onSignInClick}
        //   style={{ minWidth: '115.3px' }}
        //   content='sign in with google'
        //   icon='google'
        // />
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);

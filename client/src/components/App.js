import React, { useRef } from 'react';
import { Router, Route } from 'react-router-dom';
import MoviesContainer from './MoviesContainer';
import SearchBarHeader from './SearchBar/SearchBarHeader';
import MoviesList from './MoviesList/MoviesList';
import Footer from './Footer';
import LandingPage from './LandingPage/LandingPage';
import LoginForm from './auth/Login';
import RegisterForm from './auth/Register';
import history from '../history';
import { Sticky } from 'semantic-ui-react';

const App = () => {
  const contextRef = useRef();

  return (
    <div className='ui container' style={{ width: '100%' }} ref={contextRef}>
      <Router history={history}>
        <div>
          <Sticky context={contextRef}>
            <SearchBarHeader />
          </Sticky>
          <Route path='/' exact component={LandingPage} />
          <Route path='/movies/list' component={MoviesList} />
          <Route path='/movies/:movieId/details' component={MoviesContainer} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { watchListCheck } from '../../actions/userActions';
import GoogleAuth from './GoogleAuth';
import SearchBar from './SearchBar';
import { Menu, Segment } from 'semantic-ui-react';
import history from '../../history';

const SearchBarHeader = () => {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const number = useSelector(state => state.userActions.watchlistedNumber);
  const dispatch = useDispatch();
  const checkWatchlist = () => dispatch(watchListCheck());

  useEffect(() => {
    console.log('useEffect fired');
    conditionalRender();
    // eslint-disable-next-line
  }, [isSignedIn]);

  const conditionalRender = () => {
    console.log(isSignedIn);
    isSignedIn ? checkWatchlist() : checkWatchlist();
  };

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          as='h1'
          header
          onClick={() => history.push('/')}
          style={{ cursor: 'pointer' }}
        >
          Movie Search
        </Menu.Item>
        {/* <Menu.Item
          name='home'
          icon={{ color: 'green', name: 'home', size: 'big' }}
          onClick={() => history.push('/')}
          link
          inverted
        /> */}
        <Menu.Item>
          {/* <Input icon='search' placeholder='Search movie by title' /> */}
          <SearchBar />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='Advanced Search' icon='search' link />
          <Menu.Item
            name={number === null ? 'Watchlist' : `Watchlist (${number})`}
            icon='heart'
            color='red'
            link
          ></Menu.Item>
          <Menu.Item name='sign in' icon='sign in' link />
          <Menu.Item name='register' link />
          <Menu.Item>
            <GoogleAuth />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default SearchBarHeader;

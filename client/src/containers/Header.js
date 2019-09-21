import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main from './Main';
import Upload from './Upload';

const Header = props => {
  const isAuthenticated = useSelector(
    state => state.userReducer.isAuthenticated
  );
  return (
    <>
      <div>
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
      </div>
      <div>{isAuthenticated ? <Upload /> : <Main />}</div>
    </>
  );
};

export default Header;

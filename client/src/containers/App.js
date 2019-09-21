import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Protected from './Protected';
import Public from './Public';
import actions from '../actions/user.action';

const App = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      actions.verifyUser((success) => {
        if (!success) {
          window.location.href = '/login';
        }
      });
    } else {
      if (window.location.href.includes('login')) {
        return;
      }
      window.location.href = '/login';
      // eslint-disable-next-line no-useless-return
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isAuthenticated ? <Protected /> : <Public />;
};

export default App;

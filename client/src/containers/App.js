import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Protected from './Protected';
import Public from './Public';
import actions from '../store/actions/user.action';

const App = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      actions.verifyUser().then((success) => {
        if (!success) {
          window.location.href = '/login';
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAuthenticated ? <Protected /> : <Public />;
};

export default App;

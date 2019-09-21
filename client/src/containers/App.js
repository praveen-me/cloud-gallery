import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Protected from "./Protected";
import Public from "./Public";
import actions from "../actions/user.action";

const App = () => {
  const isAuthenticated = useSelector(
    state => state.userReducer.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(
        actions.verifyUser((success, message) => {
          if (!success) {
            window.location.href = "/login";
          }
        })
      );
    }
  }, []);

  return isAuthenticated ? <Protected /> : <Public />;
};

export default App;

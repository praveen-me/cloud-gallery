import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Header from "./Header";

const Public = () => {
  return (
    <Router>
      <div className="route-wrapper">
        <Header />
      </div>
      <Switch>
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Public;

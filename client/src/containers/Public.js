import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Header from './Header';
import Loader from '../components/Loader';

const Login = lazy(() => import('../components/Login'));
const Signup = lazy(() => import('../components/Signup'));

const Public = () => (
  <Router>
    <div className="route-wrapper">
      <Header />
    </div>
    <Switch>
      <Suspense fallback={<Loader />}>
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Suspense>
    </Switch>
  </Router>
);
export default Public;

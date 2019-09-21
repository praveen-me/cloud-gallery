import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';

const Dashboard = lazy(() => import('../components/Dashboard'));
const UploadImage = lazy(() => import('../components/UploadImage'));
const Users = lazy(() => import('../components/Users'));
const SelectedUser = lazy(() => import('../components/SelectedUser'));

const Protected = () => (
  <Router>
    <div className="route-wrapper">
      <Header />
    </div>
    <Switch>
      <Suspense fallback="loading">
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/upload" component={UploadImage} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={SelectedUser} />
      </Suspense>
    </Switch>
  </Router>
);

export default Protected;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Loader from '../components/Loader';

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
      <Suspense fallback={<Loader />}>
        <Route exact path="/current/:id" component={SelectedUser} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/upload" component={UploadImage} />
        <Route exact path="/users" component={Users} />
      </Suspense>
    </Switch>
  </Router>
);

export default Protected;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Header from './Header';
import UploadImage from '../components/UploadImage';
import Users from '../components/Users';
import SelectedUser from '../components/SelectedUser';

const Protected = () => (
  <Router>
    <div className="route-wrapper">
      <Header />
    </div>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/upload" component={UploadImage} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:id" component={SelectedUser} />
    </Switch>
  </Router>
);

export default Protected;

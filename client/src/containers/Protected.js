import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Header from './Header';
import UploadImage from '../components/UploadImage';
import Users from '../components/Users';
import SelectedUser from '../components/SelectedUser';

const Protected = () => {
	return (
		<div>
			<Router>
				<div className='route-wrapper'>
					<Header />
				</div>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/upload" component={UploadImage} />
				<Route exact path="/users" component={Users} />
				<Route exact path="/users/:id" component={SelectedUser} />
			</Router>
		</div>
	)
}

export default Protected;
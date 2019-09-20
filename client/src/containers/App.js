import React, { Component } from 'react';
import { connect } from 'react-redux';
import Protected from './Protected';
import Public from './Public';
import actions from '../actions/user.action';

class App extends Component {
	
	componentDidMount() {
		const { isAuthenticated } = this.props;
		if (isAuthenticated) {
			this.props.dispatch(actions.verifyUser((success, message) => {
				if (!success) {
					window.location.href = '/login';
				}
			}));
		}
	}
	
	render() {
		const { isAuthenticated } = this.props;
		return (
			<div>
				{
					isAuthenticated ? <Protected /> : <Public />
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.userReducer.isAuthenticated
	}
}

export default connect(mapStateToProps)(App);
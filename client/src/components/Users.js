import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../actions/user.action';

class Users extends Component {

  componentDidMount = () => {
    this.props.dispatch(actions.getUsers());
  }

  render() {
    const { users } = this.props;
    return (
      <div className='users-wrapper'>
        {
          users ? users.map(user => {
            return (
              <div key={user._id} className='user-card'>
                <p>
                  <span>Name</span> - <Link to={`/users/${user._id}`}>{user.username}</Link>
                </p>
                <p><span>Email</span> - {user.email}</p>
              </div>
            )
          }) : 'Loading...'
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users || []
  }
}

export default connect(mapStateToProps)(Users);
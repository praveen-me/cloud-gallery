import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../actions/user.action';

const Users = () => {
  const users = useSelector(state => state.userReducer.users) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUsers());
  }, [dispatch]);

  return (
    <div className="users-wrapper">
      {users
        ? users.map(user => (
            <div key={user._id} className="user-card">
              <p>
                <span>Name</span> -{' '}
                <Link to={`/users/${user._id}`}>{user.username}</Link>
              </p>
              <p>
                <span>Email</span> - {user.email}
              </p>
            </div>
          ))
        : 'Loading...'}
    </div>
  );
};

export default Users;

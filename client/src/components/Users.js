import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../store/actions/user.action';
import Loader from './Loader';

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const users = useSelector((state) => state.userReducer.users) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUsers()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    isLoading ? <Loader /> : (
      <div className="users-wrapper">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p>
              <span>Name - </span>
              <Link to={`/users/${user._id}`}>{user.username}</Link>
            </p>
            <p>
              <span>Email - </span>
              {user.email}
            </p>
          </div>
        ))}
      </div>
    )
  );
};

export default Users;

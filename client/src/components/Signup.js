import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import actions from '../store/actions/user.action';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'message') {
      setMessage(value);
    } else {
      setUsername(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, email, password };
    if (!username || !email || !password) {
      setMessage({
        message: 'Input your credentials :)',
      });
      return;
    }

    actions.createUser(data, (success) => {
      if (success) {
        history.push('/login');
      } else {
        setMessage({
          message: 'Internal server error',
        });
      }
    });
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={password}
        />
        <div className="signup-btn-wrapper">
          <input type="submit" value="Signup" />
        </div>
        <div className="signup-info">
          Already an account?
          {' '}
          <Link to="/login">Login</Link>
        </div>
        <div className="message">{message.message}</div>
      </form>
    </div>
  );
};

export default Signup;

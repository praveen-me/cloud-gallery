import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../actions/user.action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setMessage(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = { email, password };

    if (!email || !password) {
      return setMessage({
        message: "Input your credentials :)"
      });
    }
    dispatch(
      actions.loginUser(data, success => {
        if (success) {
          window.location.href = "/";
        } else {
          setMessage({
            message: "User not found"
          });
        }
      })
    );
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Login" />
        </div>
        <div className="signup-info">
          Need an account? <Link to="/register">Signup</Link>
        </div>
        <div className="message">{message.message}</div>
      </form>
    </div>
  );
};

export default Login;

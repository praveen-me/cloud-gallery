import React from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="upload">
      <Link to="/users">Users list</Link>
      <button type="button" onClick={handleLogout} className="btn-normal">Logout</button>
    </div>
  );
};


export default Upload;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import imgActions from '../actions/image.action';

const Dashboard = () => {
  const images = useSelector((state) => state.imgReducer.images) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imgActions.getImage());
  });

  return (
    <div className="image-wrapper">
      {images
        && images.map((image, index) => <img src={image} key={index} alt="" />)}
      <Link to="/upload">Upload More..</Link>
    </div>
  );
};

export default Dashboard;

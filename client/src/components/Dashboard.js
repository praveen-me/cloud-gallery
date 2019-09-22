/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import imgActions from '../store/actions/image.action';
import Loader from './Loader';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const images = useSelector((state) => state.imgReducer.images) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imgActions.getImage())
      .then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !isLoading ? (
      <div className="image-wrapper">
        {
          images.length ? (
            images.map((image, index) => <img src={image} key={index} alt={image} />)
          ) : <p>No Image Available. Please Upload.</p>
        }
        <Link to="/upload" className="upload-btn">{images.length ? 'Upload More..' : 'Upload Image'}</Link>
      </div>
    )
      : <Loader />
  );
};

export default Dashboard;

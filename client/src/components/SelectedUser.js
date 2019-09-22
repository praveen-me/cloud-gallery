import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions/user.action';
import Loader from './Loader';

const SelectedUser = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const images = useSelector((state) => state.imgReducer.images) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getImagesOfUser(match.params.id))
      .then(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isLoading ? <Loader /> : (
      <div className="image-wrapper">
        {
          images.length ? images.map((image, index) => <img src={image} key={index} alt="" />) : <p>No Images Found...</p>
        }
      </div>
    )
  );
};

export default SelectedUser;

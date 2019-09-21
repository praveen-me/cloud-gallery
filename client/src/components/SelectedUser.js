import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/actions/user.action';

const SelectedUser = ({ match }) => {
  const images = useSelector((state) => state.imgReducer.images);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getImagesOfUser(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className="image-wrapper">
      {images
        ? images.map((image, index) => <img src={image} key={index} alt="" />)
        : 'Loading...'}
    </div>
  );
};

export default SelectedUser;

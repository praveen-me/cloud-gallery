import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import imgActions from '../store/actions/image.action';
import keys from '../key';
import Loader from './Loader';

const UploadImage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleFile = (event) => {
    const photo = event.target.files[0];
    const sendImg = (str) => setImage(str);

    // file conversion to base64 using FileReader fn
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      sendImg(target.result);
    };
    reader.readAsDataURL(photo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cloudData = { file: image, upload_preset: keys.UPLOAD_PRESET };

    setIsLoading(true);

    dispatch(imgActions.cloudinaryImgUpload(cloudData))
      .then((img) => dispatch(imgActions.uploadImage(img.secure_url)))
      .then(() => history.push('/'))
      .catch(() => {
        setMessage('Something went wrong. Please upload again!!');
        setMessage(false);
      });
  };

  return (
    isLoading ? <Loader /> : (
      <div className="signup-wrapper">
        <form
          action=""
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input type="file" name="image" onChange={handleFile} />

          <input type="submit" value="Submit" className="submit-btn upload-btn" />
        </form>
        <div className="message">{message}</div>
      </div>
    )
  );
};

export default UploadImage;

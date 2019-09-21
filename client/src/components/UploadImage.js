import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import imgActions from '../store/actions/image.action';
import keys from '../key';

const UploadImage = ({ history }) => {
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

    dispatch(
      imgActions.cloudinaryImgUpload(cloudData, (success, img) => {
        if (success) {
          dispatch(
            imgActions.uploadImage(img.secure_url, (done) => {
              if (done) {
                history.push('/');
              }
            })
          );
        } else {
          setMessage(img.error);
        }
      })
    );
  };

  return (
    <div className="signup-wrapper">
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input type="file" name="image" onChange={handleFile} />
        <div className="signup-btn-wrapper">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div className="message">{message}</div>
    </div>
  );
};

export default UploadImage;

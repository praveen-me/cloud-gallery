import keys from '../../key';
import { GET_IMAGE_SUCCESS } from '../types';

const imgActions = {
  // making request to server with image url which I am getting from cloudinary
  uploadImage: (data) => async () => {
    try {
      const response = await fetch('/image/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.token,
        },
        body: JSON.stringify({ image: data }),
      });

      const image = await response.json();

      if (image.msg) {
        return Promise.resolve(true);
      }

      throw new Error('No Images Available');
    } catch (e) {
      return Promise.reject(e);
    }
  },

  /**
   * Upload images to cloudinary
   */
  cloudinaryImgUpload: (data) => async () => {
    try {
      const response = await fetch(keys.IMAGE_UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const image = await response.json();

      if (!image.error) {
        return Promise.resolve(image);
      }
      throw new Error('No Images Available');
    } catch (e) {
      return Promise.reject(e);
    }
  },

  // getting image from db in this fn
  getImage: () => async (dispatch) => {
    try {
      const response = await fetch('/image/getimage', {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.token,
        },
      });

      const json = await response.json();

      if (json.msg) {
        dispatch({
          type: GET_IMAGE_SUCCESS,
          image: json.image,
        });
        return Promise.resolve(true);
      }

      throw new Error('No Images Avalable');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export default imgActions;

import { USER_LOGIN_SUCCESS, GET_USERS_SUCCESS, GET_IMAGES_OF_USER } from '../types';

const actions = {
  /**
   * Post request for creating user
   */
  createUser: async (data) => {
    try {
      const response = await fetch(`/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (json.msg) {
        return Promise.resolve(true);
      }

      throw new Error('User not found');
    } catch (e) {
      return Promise.reject(e);
    }
  },

  /**
   * Action creator for making request for logging user
   */
  loginUser: (data) => async (dispatch) => {
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const userData = await response.json();

      if (userData.msg) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));

        dispatch({
          type: USER_LOGIN_SUCCESS,
          user: userData,
        });
        return Promise.resolve(true);
      }

      throw new Error('User is not valid');
    } catch (e) {
      return Promise.reject(e);
    }
  },

  /**
   * Action user for verifying user when a token is present in local storage
   */
  verifyUser: (cb) => {
    fetch('/users/verify', {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.msg) {
          cb(true, user.msg);
        } else {
          cb(false, user.err);
        }
      });
  },

  /**
   * Action creator for getting all user's data
   */
  getUsers: () => async (dispatch) => {
    try {
      const response = await fetch('/users/list', {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.token,
        },
      });

      const users = await response.json();

      if (users.msg) {
        dispatch({
          type: GET_USERS_SUCCESS,
          users: users.users,
        });
        return Promise.resolve(true);
      }
      throw new Error('Users not found');
    } catch (e) {
      return Promise.reject(e);
    }
  },

  /**
   * Get all images of a particular user
   */
  getImagesOfUser: (id) => (dispatch) => {
    console.log(id);
    fetch(`/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((images) => {
        if (images.msg) {
          dispatch({
            type: GET_IMAGES_OF_USER,
            user: images.user,
          });
        }
      });
  },
};

export default actions;

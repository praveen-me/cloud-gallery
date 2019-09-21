import { USER_LOGIN_SUCCESS, GET_USERS_SUCCESS, GET_IMAGES_OF_USER } from '../types';

const actions = {
  /**
   * Post request for creating user
   */
  createUser: (data, cb) => () => {
    fetch(`/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.msg) cb(true);
        else cb(false);
      });
  },

  /**
   * Action creator for making request for logging user
   */
  loginUser: (data, cb) => (dispatch) => {
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.msg) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({
            type: USER_LOGIN_SUCCESS,
            user,
          });
          cb(true);
        } else cb(false);
      });
  },

  /**
   * Action user for verifying user when a token is present in local storage
   */
  verifyUser: (cb) => () => {
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
  getUsers: () => (dispatch) => {
    fetch('/users/list', {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((users) => {
        if (users.msg) {
          dispatch({
            type: GET_USERS_SUCCESS,
            users: users.users,
          });
        }
      });
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

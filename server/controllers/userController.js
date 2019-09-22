const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');

module.exports = {
  // Creating a new user into database
  // Expect an object containing user data in req.body
  register: (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    newUser.save((err, user) => {
      if (err) return res.json({ err: 'Failed to create new user' });
      res.json({
        msg: 'User created',
        username: user.username,
        email: user.email,
      });
    });
  },

  // Login a user and expects user credentials in req.body
  login: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.status(401).json({ err: 'User not found.' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const id = user._id;
          const token = jwt.sign({ id }, process.env.secret);
          return res.status(200).json({
            msg: 'user logged in',
            name: user.username,
            email: user.email,
            token,
          });
        }
        return res.status(401).json({ err: 'Invalid User' });
      });
    });
  },

  verifyUser: (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        err: 'Unauthorized user',
      });
    }
    jwt.verify(token, process.env.secret, (error, decode) => {
      if (error) {
        return res.status(403).json({
          err: 'Send proper token',
        });
      }
      const { id } = decode;
      User.findOne({ _id: id }, (err, user) => {
        if (err) {
          return res.status(500).json({
            err: 'Internal server error',
          });
        }
        return res.status(200).json({
          msg: 'user verified',
          name: user.username,
          email: user.email,
          token,
        });
      });
    });
  },

  // Getting lists of users
  getUsers: (_, res) => {
    User.find({})
      .select('-password')
      .exec((err, users) => {
        if (err) {
          return res.status(500).json({
            err: 'Internal server error',
          });
        }

        const newUsers = users.filter((user) => user._id.toString() !== res.locals.userId.id);

        return res.status(200).json({
          msg: 'Getting users',
          users: newUsers,
        });
      });
  },

  getImagesOfUser: (req, res) => {
    const { id } = req.params;
    User.findOne({ _id: id })
      .select('-password')
      .exec((err, user) => {
        if (err) {
          return res.status(500).json({
            err: 'Internal server error',
          });
        }
        return res.status(200).json({
          msg: 'Getting images of a user',
          user,
        });
      });
  },
};

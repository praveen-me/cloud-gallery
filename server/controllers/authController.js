const jwt = require('jsonwebtoken');

module.exports = {
  // Middleware that checked that user is valid or not via verifying JWT
  isLogged: (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.secret, (err, decode) => {
      if (err) {
        return res.status(401).json({
          error: 'Send proper token',
        });
      }
      res.locals.userId = decode;
      next();
    });
  },
};

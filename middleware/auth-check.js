const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Load user model
const User = require('../models/user');

// Authentication checker function
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // Get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // Decode token using the secret key
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // 401 code for unauthorized status
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // Check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};

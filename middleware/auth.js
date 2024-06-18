const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.id;

    User.findById(req.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).send('Access denied');
      }
      req.userRole = user.role;
      next();
    });
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;

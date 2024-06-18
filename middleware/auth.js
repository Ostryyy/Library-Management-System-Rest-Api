const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send('No token provided');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).send('No token provided');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;

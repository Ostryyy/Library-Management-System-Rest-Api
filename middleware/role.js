const checkRole = (roles) => (req, res, next) => {
    const userRole = req.userRole;
    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).send('Access denied');
    }
  };
  
  module.exports = checkRole;
  
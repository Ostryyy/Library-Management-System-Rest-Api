const History = require('../models/history');

const getUserHistory = (req, res) => {
  const userId = req.userId;
  History.getByUser(userId, (err, history) => {
    if (err) return res.status(500).send(err);
    res.send(history);
  });
};

module.exports = { getUserHistory };

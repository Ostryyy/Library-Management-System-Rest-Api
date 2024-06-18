const db = require('../config/database');

const History = {
  create: (userId, bookId, action, callback) => {
    const query = `INSERT INTO history (user_id, book_id, action, date) VALUES (?, ?, ?, ?)`;
    const date = new Date().toISOString();
    db.run(query, [userId, bookId, action, date], function(err) {
      callback(err, this.lastID);
    });
  },
  getByUser: (userId, callback) => {
    const query = `SELECT * FROM history WHERE user_id = ?`;
    db.all(query, [userId], callback);
  }
};

module.exports = History;

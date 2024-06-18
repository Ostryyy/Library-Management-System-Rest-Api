const db = require('../config/database');

const Reservation = {
  create: (userId, bookId, callback) => {
    const query = `INSERT INTO reservations (user_id, book_id, reservation_date) VALUES (?, ?, ?)`;
    const date = new Date().toISOString();
    db.run(query, [userId, bookId, date], function (err) {
      callback(err, this.lastID);
    });
  },
  getByUser: (userId, callback) => {
    const query = `SELECT * FROM reservations WHERE user_id = ?`;
    db.all(query, [userId], callback);
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM reservations WHERE id = ?`;
    db.get(query, [id], callback);
  },
  delete: (id, callback) => {
    const query = `DELETE FROM reservations WHERE id = ?`;
    db.run(query, [id], callback);
  },
};

module.exports = Reservation;

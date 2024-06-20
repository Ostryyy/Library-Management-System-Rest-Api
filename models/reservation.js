const db = require("../config/database");

const Reservation = {
  create: (userId, bookId, callback) => {
    const query = `INSERT INTO reservations (user_id, book_id, reservation_date) VALUES (?, ?, ?)`;
    const reservationDate = new Date().toISOString();
    db.run(query, [userId, bookId, reservationDate], function (err) {
      callback(err, this.lastID);
    });
  },
  getByBook: (bookId, callback) => {
    const query = `
      SELECT r.*, u.username 
      FROM reservations r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.book_id = ?
    `;
    db.all(query, [bookId], callback);
  },
  getByUser: (userId, callback) => {
    const query = `SELECT * FROM reservations WHERE user_id = ?`;
    db.all(query, [userId], callback);
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM reservations WHERE id = ?`;
    db.get(query, [id], callback);
  },
  delete: (reservationId, callback) => {
    const query = `DELETE FROM reservations WHERE id = ?`;
    db.run(query, [reservationId], callback);
  },
};

module.exports = Reservation;

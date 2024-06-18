const db = require('../config/database');

const Review = {
  create: (userId, bookId, rating, comment, callback) => {
    const query = `INSERT INTO reviews (user_id, book_id, rating, comment, date) VALUES (?, ?, ?, ?, ?)`;
    const date = new Date().toISOString();
    db.run(query, [userId, bookId, rating, comment, date], function(err) {
      callback(err, this.lastID);
    });
  },
  getByBook: (bookId, callback) => {
    const query = `SELECT * FROM reviews WHERE book_id = ?`;
    db.all(query, [bookId], callback);
  }
};

module.exports = Review;

const db = require('../config/database');

const Book = {
  create: (title, author, year, category, available_copies, callback) => {
    const query = `INSERT INTO books (title, author, year, category, available_copies) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [title, author, year, category, available_copies], function(err) {
      callback(err, this.lastID);
    });
  },
  getAll: (callback) => {
    const query = `SELECT * FROM books`;
    db.all(query, [], callback);
  },
};

module.exports = Book;

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
  delete: (id, callback) => {
    const query = `DELETE FROM books WHERE id = ?`;
    db.run(query, [id], callback);
  },
  update: (id, updates, callback) => {
    const query = `UPDATE books SET title = ?, author = ?, year = ?, category = ?, available_copies = ? WHERE id = ?`;
    db.run(query, [updates.title, updates.author, updates.year, updates.category, updates.available_copies, id], callback);
  },
  search: (title, author, category, callback) => {
    let query = `SELECT * FROM books WHERE 1=1`;
    const params = [];
    if (title) {
      query += ` AND title LIKE ?`;
      params.push(`%${title}%`);
    }
    if (author) {
      query += ` AND author LIKE ?`;
      params.push(`%${author}%`);
    }
    if (category) {
      query += ` AND category LIKE ?`;
      params.push(`%${category}%`);
    }
    db.all(query, params, callback);
  }
};

module.exports = Book;

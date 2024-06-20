const db = require("../config/database");

const Book = {
  create: (title, author, year, category, available_copies, callback) => {
    const query = `INSERT INTO books (title, author, year, category, available_copies) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      query,
      [title, author, year, category, available_copies],
      function (err) {
        callback(err, this.lastID);
      }
    );
  },
  getAll: (callback) => {
    const query = `SELECT * FROM books`;
    db.all(query, [], callback);
  },
  getById: (id, callback) => {
    const query = `SELECT * FROM books WHERE id = ?`;
    db.get(query, [id], callback);
  },
  delete: (id, callback) => {
    const query = `DELETE FROM books WHERE id = ?`;
    db.run(query, [id], callback);
  },
  update: (id, updates, callback) => {
    const query = `UPDATE books SET title = ?, author = ?, year = ?, category = ?, available_copies = ? WHERE id = ?`;
    db.run(
      query,
      [
        updates.title,
        updates.author,
        updates.year,
        updates.category,
        updates.available_copies,
        id,
      ],
      callback
    );
  },
  search: (title, author, category, callback) => {
    const query = `SELECT * FROM books WHERE title LIKE ? AND author LIKE ? AND category LIKE ?`;
    db.all(query, [`%${title}%`, `%${author}%`, `%${category}%`], callback);
  },
};

module.exports = Book;

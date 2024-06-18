const db = require('../config/database');

const User = {
  create: (username, password, role, callback) => {
    const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    db.run(query, [username, password, role], function (err) {
      callback(err, this.lastID);
    });
  },
  findByUsername: (username, callback) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], callback);
  },
  findById: (id, callback) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], callback);
  },
  delete: (id, callback) => {
    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], callback);
  },
  update: (id, updates, callback) => {
    const query = `UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?`;
    db.run(query, [updates.username, updates.password, updates.role, id], callback);
  }
};

module.exports = User;

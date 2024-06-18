const db = require('../config/database');

const User = {
  create: (username, password, callback) => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function(err) {
      callback(err, this.lastID);
    });
  },
  findByUsername: (username, callback) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], callback);
  }
};

module.exports = User;

const db = require('../config/database');

const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      db.run('DELETE FROM reviews');
      db.run('DELETE FROM history');
      db.run('DELETE FROM reservations');
      db.run('DELETE FROM books');
      db.run('DELETE FROM users');

      db.run('COMMIT', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

module.exports = clearDatabase;

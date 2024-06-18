const { body, validationResult } = require('express-validator');
const Reservation = require('../models/reservation');

const reserveBook = [
  body('bookId').isInt({ min: 0 }).withMessage('Book ID must be a positive integer'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { bookId } = req.body;
    const userId = req.userId;
    Reservation.create(userId, bookId, (err, reservationId) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ reservationId });
    });
  }
];

const getUserReservations = (req, res) => {
  const userId = req.userId;
  Reservation.getByUser(userId, (err, reservations) => {
    if (err) return res.status(500).send(err);
    res.send(reservations);
  });
};

module.exports = { reserveBook, getUserReservations };

const { body, validationResult, param } = require('express-validator');
const Reservation = require('../models/reservation');
const History = require('../models/history');

const reserveBook = [
  body('bookId').isInt({ min: 0 }).withMessage('Book ID must be a positive integer'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId } = req.body;
    const userId = req.userId;
    Reservation.create(userId, bookId, (err, reservationId) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      History.create(userId, bookId, 'reserved', () => { });
      res.status(201).send({ reservationId });
    });
  }
];

const getUserReservations = (req, res) => {
  const userId = req.userId;
  Reservation.getByUser(userId, (err, reservations) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send(reservations);
  });
};

const cancelReservation = [
  param('id').isInt({ min: 1 }).withMessage('Reservation ID must be a positive integer'),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const reservationId = req.params.id;
    console.log('Cancel reservation ID:', reservationId);

    Reservation.findById(reservationId, (err, reservation) => {
      if (err) {
        console.error('Error finding reservation:', err);
        return res.status(500).send(err);
      }
      if (!reservation) {
        console.error('Reservation not found');
        return res.status(404).send('Reservation not found');
      }
      Reservation.delete(reservationId, (err) => {
        if (err) {
          console.error('Error deleting reservation:', err);
          return res.status(500).send(err);
        }
        History.create(reservation.user_id, reservation.book_id, 'cancelled', () => { });
        res.status(204).send();
      });
    });
  }
];

module.exports = { reserveBook, getUserReservations, cancelReservation };

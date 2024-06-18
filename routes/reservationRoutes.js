const express = require('express');
const { reserveBook, getUserReservations, cancelReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, reserveBook);
router.get('/', authMiddleware, getUserReservations);
router.delete('/:id', authMiddleware, cancelReservation);

module.exports = router;

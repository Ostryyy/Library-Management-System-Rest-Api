const express = require('express');
const { reserveBook, getUserReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, reserveBook);
router.get('/', authMiddleware, getUserReservations);

module.exports = router;

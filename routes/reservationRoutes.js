const express = require("express");
const {
  reserveBook,
  getUserReservations,
  cancelReservation,
  getReservationsByBook,
} = require("../controllers/reservationController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware, reserveBook);
router.get("/", authMiddleware, getUserReservations);
router.delete("/:id", authMiddleware, cancelReservation);
router.get("/book/:bookId", authMiddleware, getReservationsByBook);

module.exports = router;

const express = require('express');
const { addReview, getBookReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/:bookId', authMiddleware, addReview);
router.get('/:bookId', getBookReviews);

module.exports = router;

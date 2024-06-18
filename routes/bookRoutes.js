const express = require('express');
const { addBook, getAllBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, addBook);
router.get('/', getAllBooks);

module.exports = router;

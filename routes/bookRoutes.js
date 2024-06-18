const express = require('express');
const { addBook, getAllBooks, deleteBook, updateBook, searchBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');
const router = express.Router();

router.post('/', authMiddleware, checkRole(['admin']), addBook);
router.get('/', authMiddleware, getAllBooks);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteBook);
router.put('/:id', authMiddleware, checkRole(['admin']), updateBook);
router.get('/search', authMiddleware, searchBooks);

module.exports = router;

const { body, validationResult } = require('express-validator');
const Book = require('../models/book');

const addBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('year').isInt({ min: 0 }).withMessage('Year must be a positive integer'),
  body('category').notEmpty().withMessage('Category is required'),
  body('available_copies').isInt({ min: 0 }).withMessage('Available copies must be a positive integer'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { title, author, year, category, available_copies } = req.body;
    Book.create(title, author, year, category, available_copies, (err, bookId) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ bookId });
    });
  }
];

const getAllBooks = (req, res) => {
  Book.getAll((err, books) => {
    if (err) return res.status(500).send(err);
    res.send(books);
  });
};

module.exports = { addBook, getAllBooks };

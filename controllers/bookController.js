const Book = require('../models/book');

const addBook = (req, res) => {
  const { title, author, year, category, available_copies } = req.body;
  Book.create(title, author, year, category, available_copies, (err, bookId) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ bookId });
  });
};

const getAllBooks = (req, res) => {
  Book.getAll((err, books) => {
    if (err) return res.status(500).send(err);
    res.send(books);
  });
};

module.exports = { addBook, getAllBooks };

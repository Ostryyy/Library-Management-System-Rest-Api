const { body, validationResult, param } = require("express-validator");
const Book = require("../models/book");

const addBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("year").isInt({ min: 0 }).withMessage("Year must be a positive integer"),
  body("category").notEmpty().withMessage("Category is required"),
  body("available_copies")
    .isInt({ min: 0 })
    .withMessage("Available copies must be a positive integer"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, year, category, available_copies } = req.body;
    Book.create(
      title,
      author,
      year,
      category,
      available_copies,
      (err, bookId) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ bookId });
      }
    );
  },
];

const getAllBooks = (req, res) => {
  Book.getAll((err, books) => {
    if (err) return res.status(500).send(err);
    res.send(books);
  });
};

const getBookById = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Book ID must be a positive integer"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookId = req.params.id;
    Book.getById(bookId, (err, book) => {
      if (err) return res.status(500).send(err);
      if (!book) return res.status(404).send("Book not found");
      res.send(book);
    });
  },
];

const deleteBook = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Book ID must be a positive integer"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookId = req.params.id;
    Book.delete(bookId, (err) => {
      if (err) return res.status(500).send(err);
      res.status(204).send();
    });
  },
];

const updateBook = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Book ID must be a positive integer"),
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("author").optional().notEmpty().withMessage("Author is required"),
  body("year")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Year must be a positive integer"),
  body("category").optional().notEmpty().withMessage("Category is required"),
  body("available_copies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available copies must be a positive integer"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;
    const bookId = req.params.id;
    Book.update(bookId, updates, (err) => {
      if (err) return res.status(500).send(err);
      res.status(200).send();
    });
  },
];

const searchBooks = (req, res) => {
  const { title, author, category } = req.query;
  Book.search(title, author, category, (err, books) => {
    if (err) return res.status(500).send(err);
    res.send(books);
  });
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  searchBooks,
};

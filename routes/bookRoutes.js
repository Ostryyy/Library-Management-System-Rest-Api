const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  deleteBook,
  updateBook,
  searchBooks,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware, addBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.delete("/:id", authMiddleware, deleteBook);
router.put("/:id", authMiddleware, updateBook);
router.get("/search", searchBooks);

module.exports = router;

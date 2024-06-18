const { body, validationResult, param } = require('express-validator');
const Review = require('../models/review');

const addReview = [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').notEmpty().withMessage('Comment is required'),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rating, comment } = req.body;
        const userId = req.userId;
        const bookId = req.params.bookId;
        Review.create(userId, bookId, rating, comment, (err, reviewId) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ reviewId });
        });
    }
];

const getBookReviews = (req, res) => {
    const bookId = req.params.bookId;
    Review.getByBook(bookId, (err, reviews) => {
        if (err) return res.status(500).send(err);
        res.send(reviews);
    });
};

module.exports = { addReview, getBookReviews };

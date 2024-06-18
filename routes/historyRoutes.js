const express = require('express');
const { getUserHistory } = require('../controllers/historyController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, getUserHistory);

module.exports = router;

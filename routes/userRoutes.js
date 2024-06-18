const express = require('express');
const { register, login, deleteUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/role');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/:id', authMiddleware, checkRole(['admin']), deleteUser);
router.put('/:id', authMiddleware, checkRole(['admin']), updateUser);

module.exports = router;

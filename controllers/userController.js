const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).send(err);
      User.create(username, hash, (err, userId) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ userId });
      });
    });
  }
];

const login = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password } = req.body;
    User.findByUsername(username, (err, user) => {
      if (err || !user) return res.status(404).send('User not found');
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) return res.status(401).send('Invalid password');
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.send({ token });
      });
    });
  }
];

module.exports = { register, login };

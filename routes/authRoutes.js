const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Define the routes required by the assignment
router.post('/register', register);
router.post('/login', login);

module.exports = router;
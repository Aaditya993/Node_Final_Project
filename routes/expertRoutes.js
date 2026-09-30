const express = require('express');
const router = express.Router();
const { giveAdvice, getFarmAdvice } = require('../controllers/expertController');
const { protect, authorize } = require('../middleware/authMiddleware');

// The authorize('expert') middleware strictly blocks farmers from using this route
router.post('/advice', protect, authorize('expert'), giveAdvice);

// We only use 'protect' here so BOTH farmers and experts can read the advice
router.get('/advice/:farmId', protect, getFarmAdvice);

module.exports = router;
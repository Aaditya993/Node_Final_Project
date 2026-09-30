const express = require('express');
const router = express.Router();
const { sendPushNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/send', protect, authorize('expert', 'farmer'), sendPushNotification);

module.exports = router;
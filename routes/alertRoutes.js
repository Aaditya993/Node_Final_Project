const express = require('express');
const router = express.Router();
const { getAlerts, checkAlerts } = require('../controllers/alertController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('farmer'), getAlerts);
router.post('/check', protect, authorize('farmer'), checkAlerts);

module.exports = router;
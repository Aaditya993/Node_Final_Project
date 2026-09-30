const express = require('express');
const router = express.Router();
const { startIrrigation, stopIrrigation, getSchedule } = require('../controllers/irrigationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/start', protect, authorize('farmer'), startIrrigation);
router.post('/stop', protect, authorize('farmer'), stopIrrigation);
router.get('/schedule', protect, authorize('farmer'), getSchedule);

module.exports = router;
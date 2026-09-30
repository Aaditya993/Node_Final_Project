const express = require('express');
const router = express.Router();
const { recordData, getAllData, getDataBySensor } = require('../controllers/sensorDataController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('farmer'), recordData);
router.get('/', protect, authorize('farmer'), getAllData);
router.get('/sensor/:id', protect, authorize('farmer'), getDataBySensor);

module.exports = router;
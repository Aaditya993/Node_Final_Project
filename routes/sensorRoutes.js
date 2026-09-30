const express = require('express');
const router = express.Router();
const { createSensor, getSensors, deleteSensor } = require('../controllers/sensorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('farmer'), createSensor);
router.get('/', protect, authorize('farmer'), getSensors);
router.delete('/:id', protect, authorize('farmer'), deleteSensor);

module.exports = router;
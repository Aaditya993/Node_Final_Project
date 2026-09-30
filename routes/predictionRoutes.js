const express = require('express');
const router = express.Router();
const { getHarvestPrediction, getYieldPrediction } = require('../controllers/predictionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/harvest', protect, authorize('farmer'), getHarvestPrediction);
router.get('/yield', protect, authorize('farmer'), getYieldPrediction);

module.exports = router;
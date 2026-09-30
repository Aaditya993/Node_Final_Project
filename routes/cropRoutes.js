const express = require('express');
const router = express.Router();
const { createCrop, getCrops, getCropById, updateCrop } = require('../controllers/cropController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('farmer'), createCrop);
router.get('/', protect, authorize('farmer'), getCrops);
router.get('/:id', protect, authorize('farmer'), getCropById);
router.put('/:id', protect, authorize('farmer'), updateCrop);

module.exports = router;
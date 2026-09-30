const express = require('express');
const router = express.Router();
const { createFarm, getFarms, getFarmById, updateFarm, deleteFarm } = require('../controllers/farmController');
const { protect, authorize } = require('../middleware/authMiddleware');


// Only someone with a valid token (protect) AND the role of 'farmer' (authorize) can use this route
router.post('/', protect, authorize('farmer'), createFarm);

router.get('/', protect, authorize('farmer'), getFarms);
router.get('/:id', protect, authorize('farmer'), getFarmById);
router.put('/:id', protect, authorize('farmer'), updateFarm);
router.delete('/:id', protect, authorize('farmer'), deleteFarm);

module.exports = router;
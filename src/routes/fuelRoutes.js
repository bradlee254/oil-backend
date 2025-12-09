const express = require('express');
const router = express.Router();
const { createFuelRequest, getMyRequests } = require('../controllers/fuelController');
const { protect } = require('../middleware/authMiddleware');

router.post('/request', protect, createFuelRequest);
router.get('/requests', protect, getMyRequests);

module.exports = router;
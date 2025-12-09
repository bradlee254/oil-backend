const express = require('express');
const router = express.Router();
const { createFuelRequest, getMyRequests, getAllRequests, updateRequestStatus} = require('../controllers/fuelController');
const { protect } = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

router.post('/request', protect, createFuelRequest);
router.get('/requests', protect, getMyRequests);

router.get('/all', protect, authorizeRoles('admin'), getAllRequests);
router.put('/:id/status', protect, authorizeRoles('admin'), updateRequestStatus);

module.exports = router;
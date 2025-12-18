const express = require('express');
const router = express.Router();
const {getRiders, assignRider} = require('../controllers/adminController');
const {protect, authAdmin} = require('../middleware/authMiddleware');

router.get('/riders', protect, authAdmin, getRiders);

router.put('/requests/:requestId/assign', protect, authAdmin, assignRider);

module.exports = router;
const express = require('express');
const router = express.Router();
const { assignRider } = require('../controllers/riderControllers');
const { protect, authAdmin } = require('../middleware/authMiddleware');

// Order matters: protect first, then authAdmin
router.put('/assign/:requestId', protect, authAdmin, assignRider);

module.exports = router;

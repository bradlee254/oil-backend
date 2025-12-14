const express = require('express');
const router = express.Router();
const {getRiders} = require('../controllers/adminController');
const {protect, authAdmin} = require('../middleware/authMiddleware');

router.get('/riders', protect, authAdmin, getRiders);

module.exports = router;
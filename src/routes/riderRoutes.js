const express = require('express');
const router = express.Router();
const {assignRider} =require('../controllers/riderControllers');
const {authAdmin} = require('../middlewares/authMiddleware');

router.put('/assign/:requestId', authAdmin, assignRider);

module.exports = router;
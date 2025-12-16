const express = require('express');
const router = express.Router();
const {getMyAssignedRequests, updateDeliveryStatus} = require('../controllers/riderControllers');
const {protect} =require('../middleware/authMiddleware');

const riderOnly =(req, res, next)=>{
    if(req.user.role !== 'rider'){
        return res.status(403).json({message: 'Access denied, riders only'});
        
    }
    next();
}
router.get('/requests', protect, riderOnly, getMyAssignedRequests);
router.put('/requests/:id/status', protect, riderOnly, updateDeliveryStatus);

module.exports = router;

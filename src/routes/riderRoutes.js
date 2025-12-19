import express from 'express';
const router = express.Router();
const {getMyAssignedRequests, startDelivery,completeDelivery} = require('../controllers/riderControllers');
const {protect} =require('../middleware/authMiddleware');

const riderOnly =(req, res, next)=>{
    if(req.user.role !== 'rider'){
        return res.status(403).json({message: 'Access denied, riders only'});
        
    }
    next();
}
router.get('/requests', protect, riderOnly, getMyAssignedRequests);
router.put('/start/:id', protect, riderOnly, startDelivery);
router.put('/complete/:id', protect, riderOnly, completeDelivery);

module.exports = router;

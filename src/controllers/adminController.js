const User = require("../models/User");

exports.getRiders = async (req, res)=>{
    try{
        const riders = await User.find({role:'rider'}).select('name email');
        res.json({riders})
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }

}

exports.assignRider= async(req, res)=>{
    try{
        const {requestId,} = req.params;
        const {riderId} = req.body;

        if( !riderId){
            return res.status(400).json({message: 'Rider ID is required'});
        }

        const request = await FuelRequest.findById(requestId);
        if(!request){
            return res.status(404).json({message: 'Fuel request not found'});
        }
         if(request.status !== 'pending'){
            return res.status(400).json({message: 'Only pending requests can be assigned'});
         }

         const rider = await User.findById(riderId);
         if(!rider || rider.role !== 'rider'{
            return res.status(404).json({message: 'Rider not found'});
         }

         request.rider = riderId;
         request.status = 'assigned';
            await request.save();

            await request.populate('rider', 'name email');
            await request.populate('user', 'name email');

            res.json({message: 'Rider assigned successfully', request});
    }catch(error){
        res.status(500).json({
            message: 'Server Error',
            error: error.message
         })
    }
}
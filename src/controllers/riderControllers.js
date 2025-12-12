const Rider = require('../models/Rider');

const FuelRequest = require('../models/FuelRequest');

exports.assignRider = async (req, res) =>{
    try{
        const {requestId} = req.params;
        const {riderId} = req.body;

        const rider = await Rider.findById(riderId);
        if(!rider) return res.status(404).json({message: 'Rider not found'});

        if (rider.status !== 'available')
            return res.status(400).json({message: 'Rider is currently busy'});
        const fuelRequest = await FuelRequest.find(requestId);
        if(!fuelRequest) return res.status(404).json({message: 'Fuel request not found'});

        fuelRequest.rider = riderId;
        await fuelRequest.save();

        rider.status = 'busy';
        await rider.save();
        
        res.json({message: 'Rider assigned successfully', fuelRequest});
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
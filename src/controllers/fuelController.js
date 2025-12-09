const FuelRequest = require('../models/FuelRequest');

exports.createFuelRequest = async (req, res) => {
    try{
        const {fuelType, amount, coordinates} = req.body;

        if(!fuelType || !amount || !coordinates){
            return res.status(400).json({message: 'All fields are required'});
        }

        const fuelRequest = await FuelRequest.create({
            user: req.user._id,
            fuelType,
            amount,
            location:{ type: 'Point', coordinates}
        });
        res.status(201).json({message: 'Fuel request created successfully', fuelRequest});
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
};

exports.getMyRequests = async (req, res) =>{
    try{
        const requests = await FuelRequest.find({user: req.user._id});
        res.status(200).json({requests});
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }
}
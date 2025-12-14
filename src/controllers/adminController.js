const User = require("../models/User");

exports.getRiders = async (req, res)=>{
    try{
        const riders = await User.find({role:'rider'}).select('name email');
        res.json({riders})
    }catch(error){
        res.status(500).json({message: 'Server Error', error: error.message});
    }

}
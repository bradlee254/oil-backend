
const FuelRequest = require('../models/FuelRequest');

exports.assignRider = async (req, res) => {
  try {
    const { requestId } = req.params;
    const riderId = req.body?.riderId; // safe destructure

    if (!riderId) {
      return res.status(400).json({ message: 'riderId is required in the request body' });
    }

    const rider = await Rider.findById(riderId);
    if (!rider) return res.status(404).json({ message: 'Rider not found' });

    if (rider.status !== 'available') {
      return res.status(400).json({ message: 'Rider is currently busy' });
    }

    const fuelRequest = await FuelRequest.findById(requestId);
    if (!fuelRequest) return res.status(404).json({ message: 'Fuel request not found' });

    fuelRequest.rider = riderId;
    await fuelRequest.save();

    rider.status = 'busy';
    await rider.save();

    res.json({ message: 'Rider assigned successfully', fuelRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

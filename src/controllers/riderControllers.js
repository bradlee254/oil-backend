const FuelRequest = require("../models/FuelRequest");

// Rider: view assigned jobs
export const getMyAssignments = async (req, res) => {
  try {
    const requests = await FuelRequest.find({
      rider: req.user._id,
      status: { $in: ["assigned", "on_the_way"] },
    }).populate("user", "name email");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Rider: start delivery
export const  startDelivery = async (req, res) => {
  try {
    const request = await FuelRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.rider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your assignment" });

    request.status = "on_the_way";
    await request.save();

    res.json({ message: "Delivery started", request });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Rider: complete delivery
export const completeDelivery = async (req, res) => {
  try {
    const request = await FuelRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.rider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not your assignment" });

    request.status = "delivered";
    await request.save();

    res.json({ message: "Delivery completed", request });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

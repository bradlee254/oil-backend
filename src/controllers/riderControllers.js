const FuelRequest = require("../models/FuelRequest");

exports.getMyAssignedRequests = async (req, res) => {
  try {
    const requests = await FuelRequest.find({
      rider: req.user._id,
      status: { $in: ["assigned", "on_the_way"] },
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["on_the_way", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const request = await FuelRequest.findOne({
      _id: id,
      rider: req.user._id,
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Status updated", request });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

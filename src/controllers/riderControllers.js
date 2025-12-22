
import FuelRequest from "../models/FuelRequest.js";

// Rider: view assigned jobs
export const getMyAssignments = async (req, res) => {
  try {
    const requests = await FuelRequest.find({
      rider: req.user._id,
      status: { $in: ["assigned", "on_the_way", "delivered"] },
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (err) {
    console.error("Get my assignments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  start delivery
export const startDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await FuelRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your assignment" });
    }

    if (request.status !== "assigned") {
      return res.status(400).json({ message: "Can only start assigned requests" });
    }

    request.status = "on_the_way";
    await request.save();

    await request.populate("user", "name email");

    res.json({ message: "Delivery started", request });
  } catch (err) {
    console.error("Start delivery error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  complete delivery
export const completeDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await FuelRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your assignment" });
    }

    if (request.status !== "on_the_way") {
      return res.status(400).json({ message: "Can only complete requests on the way" });
    }

    request.status = "delivered";
    await request.save();

    await request.populate("user", "name email");

    res.json({ message: "Delivery completed", request });
  } catch (err) {
    console.error("Complete delivery error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
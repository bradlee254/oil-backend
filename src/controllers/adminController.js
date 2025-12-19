// controllers/adminController.js

const User = require("../models/User");
const FuelRequest = require("../models/FuelRequest"); // ← Critical: was missing before

// Get all riders (for admin to select from)

export const getRiders = async (req, res) => {
  try {
    const riders = await User.find({ role: "rider" }).select("name email");
    res.json({ riders });
  } catch (error) {
    console.error("Get riders error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Assign a rider to a fuel request
export const assignRider = async (req, res) => {
  try {
    const { requestId } = req.params; // ← Fixed: removed extra comma
    const { riderId } = req.body;

    // Validate riderId is provided
    if (!riderId) {
      return res.status(400).json({ message: "Rider ID is required" });
    }

    // Find the fuel request
    const request = await FuelRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Fuel request not found" });
    }

    // Only pending requests can be assigned
    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending requests can be assigned" });
    }

    // Validate the rider exists and has role 'rider'
    const rider = await User.findById(riderId);
    if (!rider || rider.role !== "rider") {
      return res.status(400).json({ message: "Invalid rider" });
    }

    // Assign the rider and update status
    request.rider = riderId;
    request.status = "assigned";
    await request.save();

    // Populate user and rider details for the response
    await request.populate("user", "name email");
    await request.populate("rider", "name email");

    // Success response
    res.json({
      message: "Rider assigned successfully",
      request,
    });
  } catch (error) {
    console.error("Assign rider error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// src/controllers/fuelController.js
import FuelRequest from "../models/FuelRequest.js";
import User from "../models/User.js"; // We use User instead of a separate Rider model

export const createFuelRequest = async (req, res) => {
  try {
    const { fuelType, amount, coordinates } = req.body;

    if (!fuelType || !amount || !coordinates || !Array.isArray(coordinates)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fuelRequest = await FuelRequest.create({
      user: req.user._id,
      fuelType,
      amount,
      location: { type: "Point", coordinates },
    });

    // Populate user for response
    await fuelRequest.populate("user", "name email");

    res.status(201).json({
      message: "Fuel request created successfully",
      fuelRequest,
    });
  } catch (error) {
    console.error("Create fuel request error:", error); // ← Helps debugging
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await FuelRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("rider", "name email");

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Get my requests error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Admin only
export const getAllRequests = async (req, res) => {
  try {
    const requests = await FuelRequest.find()
      .populate("user", "name email")
      .populate("rider", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Get all requests error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update request status - Admin only
export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const request = await FuelRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Fuel request not found" });
    }

    request.status = status;
    await request.save();

    // If delivered, free up the rider (optional feature)
    if (status === "delivered" && request.rider) {
      await User.findByIdAndUpdate(request.rider, { status: "available" });
    }

    await request.populate("user", "name email");
    await request.populate("rider", "name email");

    res.json({ message: "Request status updated", request });
  } catch (error) {
    console.error("Update request status error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
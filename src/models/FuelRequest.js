
import mongoose from "mongoose";

const fuelRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel"], 
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "on_the_way", "delivered", "cancelled"],
    default: "pending",
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, {
  timestamps: true,
});

// Create 2dsphere index for geo queries (optional but useful)
fuelRequestSchema.index({ location: "2dsphere" });

export default mongoose.model("FuelRequest", fuelRequestSchema);
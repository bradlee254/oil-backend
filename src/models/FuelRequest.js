const mongoose = require("mongoose");

const fuelRequestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  rider:{
    type:mongoose.Schema.Types.ObjectId, ref: "User"

  },
  location: {
    type: {
      type: String, 
      enum: ["Point"], 
      default: "Point"
    },
    coordinates: { // [longitude, latitude]
      type: [Number],
      required: true
    }
  },
  fuelType: { // Note the capital T
    type: String,
    enum: ["Petrol", "Diesel"],
    required: true
  },
  amount: {
    type: Number, 
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending"
  },
  rider:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rider",
    default: null
  }
}, { timestamps: true });

fuelRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("FuelRequest", fuelRequestSchema);

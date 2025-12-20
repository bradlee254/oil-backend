import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyAssignments,
  startDelivery,
  completeDelivery,
} from "../controllers/riderControllers.js";

const router = express.Router();

// Get my active assignments
router.get("/requests", protect, getMyAssignments);

// Start and complete delivery
router.put("/requests/:id/start", protect, startDelivery);
router.put("/requests/:id/complete", protect, completeDelivery);

export default router;
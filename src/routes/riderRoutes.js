import express from "express";
import {
  getMyAssignments,
  startDelivery,
  completeDelivery,
} from "../controllers/riderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const riderOnly = (req, res, next) => {
  if (req.user.role !== "rider") {
    return res.status(403).json({ message: "Access denied, riders only" });
  }
  next();
};
router.get("/requests", protect, riderOnly, getMyAssignments);
router.put("/start/:id", protect, riderOnly, startDelivery);
router.put("/complete/:id", protect, riderOnly, completeDelivery);

export default router;

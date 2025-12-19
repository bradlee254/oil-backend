import express from "express";

import {
  createFuelRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from "../controllers/fuelController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/request", protect, createFuelRequest);
router.get("/requests", protect, getMyRequests);

router.get("/all", protect, authorizeRoles("admin"), getAllRequests);
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateRequestStatus
);

export default router;

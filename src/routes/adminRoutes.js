import express from "express";
import { getRiders, assignRider } from "../controllers/adminController.js";
import { protect, authAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/riders", protect, authAdmin, getRiders);

router.put("/requests/:requestId/assign", protect, authAdmin, assignRider);

export default router;

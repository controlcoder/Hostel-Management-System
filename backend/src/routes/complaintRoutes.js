import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  resolveComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createComplaint);
router.get("/my", getMyComplaints);

// Admin-only routes
router.get("/all", adminMiddleware, getAllComplaints);
router.put("/:id/resolve", adminMiddleware, resolveComplaint);

export default router;

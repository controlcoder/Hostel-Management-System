import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import {
  createRoomRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/roomRequestController.js";

const router = express.Router();

router.use(authMiddleware);

// Student routes
router.post("/", createRoomRequest);
router.get("/my", getMyRequests);

// Admin routes
router.get("/all", adminMiddleware, getAllRequests);
router.put("/:id/approve", adminMiddleware, approveRequest);
router.put("/:id/reject", adminMiddleware, rejectRequest);

export default router;

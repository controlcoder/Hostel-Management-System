import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import {
  getAllRooms,
  createRoom,
  assignStudent,
  unassignStudent,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllRooms);

// Admin-only routes
router.post("/", adminMiddleware, createRoom);
router.put("/:id/assign", adminMiddleware, assignStudent);
router.put("/:id/unassign", adminMiddleware, unassignStudent);
router.delete("/:id", adminMiddleware, deleteRoom);

export default router;

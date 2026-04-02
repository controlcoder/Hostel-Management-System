import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import {
  createNotice,
  getAllNotices,
  deleteNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllNotices);

// Admin-only routes
router.post("/", adminMiddleware, createNotice);
router.delete("/:id", adminMiddleware, deleteNotice);

export default router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import {
  createFee,
  getAllFees,
  getMyFees,
  markAsPaid,
} from "../controllers/feeController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/my", getMyFees);

// Admin-only routes
router.post("/", adminMiddleware, createFee);
router.get("/all", adminMiddleware, getAllFees);
router.put("/:id/pay", adminMiddleware, markAsPaid);

export default router;

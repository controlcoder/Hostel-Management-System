import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
import authRoutes from "./src/routes/authRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import complaintRoutes from "./src/routes/complaintRoutes.js";
import feeRoutes from "./src/routes/feeRoutes.js";
import noticeRoutes from "./src/routes/noticeRoutes.js";
import roomRequestRoutes from "./src/routes/roomRequestRoutes.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import adminMiddleware from "./src/middlewares/admin.middleware.js";
import userModel from "./src/model/user.model.js";
import roomModel from "./src/model/room.model.js";
import complaintModel from "./src/model/complaint.model.js";
import feeModel from "./src/model/fee.model.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/room-requests", roomRequestRoutes);

// Admin stats endpoint
app.get("/api/admin/stats", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const totalStudents = await userModel.countDocuments({ role: "user" });
    const rooms = await roomModel.find();
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((r) => r.occupants.length > 0).length;
    const pendingComplaints = await complaintModel.countDocuments({ status: "pending" });
    const paidFees = await feeModel.find({ status: "paid" });
    const monthlyRevenue = paidFees.reduce((sum, f) => sum + f.amount, 0);

    return res.json({
      success: true,
      stats: {
        totalStudents,
        totalRooms,
        occupiedRooms,
        pendingComplaints,
        monthlyRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Get all students (admin)
app.get("/api/admin/students", authMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    const students = await userModel
      .find({ role: "user" })
      .populate("room", "roomNumber floor")
      .select("-password");

    return res.json({ success: true, students });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "something went wrong", error: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

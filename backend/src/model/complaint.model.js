import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: [true, "Complaint description is required"],
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const complaintModel = mongoose.model("complaint", complaintSchema);

export default complaintModel;

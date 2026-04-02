import mongoose from "mongoose";

const roomRequestSchema = new mongoose.Schema(
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
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// One pending request per student at a time
roomRequestSchema.index(
  { student: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } },
);

const roomRequestModel = mongoose.model("roomRequest", roomRequestSchema);

export default roomRequestModel;

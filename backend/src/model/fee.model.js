import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: 0,
    },
    month: {
      type: String,
      required: [true, "Month is required"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    paidDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Prevent duplicate fee for same student + month + year
feeSchema.index({ student: 1, month: 1, year: 1 }, { unique: true });

const feeModel = mongoose.model("fee", feeSchema);

export default feeModel;

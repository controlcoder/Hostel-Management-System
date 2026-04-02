import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    floor: {
      type: Number,
      required: [true, "Floor is required"],
    },
    capacity: {
      type: Number,
      required: true,
      default: 3,
      min: 1,
      max: 6,
    },
    type: {
      type: String,
      enum: ["single", "double", "triple"],
      default: "triple",
    },
    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

roomSchema.virtual("availableSlots").get(function () {
  return this.capacity - this.occupants?.length;
});

roomSchema.set("toJSON", { virtuals: true });
roomSchema.set("toObject", { virtuals: true });

const roomModel = mongoose.model("room", roomSchema);

export default roomModel;

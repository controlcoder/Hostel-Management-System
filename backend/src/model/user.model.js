import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      ],
      unique: [true, "email already exists"],
    },
    name: {
      type: String,
      required: [true, "name is required for creating an account"],
    },
    password: {
      type: String,
      required: [true, "password is required for creating an account"],
      minlength: [6, "password should contain atleast 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
      default: null,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "role can either be admin or user",
      },
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;

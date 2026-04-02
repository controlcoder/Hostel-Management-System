import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

// @desc Register user
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "invalid details" });
    }

    if (role === "admin") {
      const isExists = await userModel.findOne({ role: "admin" });
      if (isExists) {
        return res
          .status(409)
          .json({ success: false, message: "admin already exists" });
      }
    }

    const isExists = await userModel.findOne({ email });
    if (isExists)
      return res.status(409).json({
        message: "user already exists with this email",
        success: false,
      });

    const user = await userModel.create({
      email,
      password,
      name,
      role: role || "user",
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      user: { _id: user._id, email: user.email, name: user.name, role: user.role },
      message: "user created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("email name password role");
    if (!user)
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      user: { _id: user._id, email: user.email, name: user.name, role: user.role },
      message: "user logged in",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Logout user
export const logoutUser = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "user logout" });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    return res.json({ success: true, message: "user info retrieved", user });
  } catch (err) {
    next(err);
  }
};

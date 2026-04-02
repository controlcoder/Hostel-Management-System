import feeModel from "../model/fee.model.js";

// @desc Create a fee record (admin)
export const createFee = async (req, res, next) => {
  try {
    const { studentId, amount, month, year } = req.body;

    if (!studentId || !amount || !month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const fee = await feeModel.create({
      student: studentId,
      amount,
      month,
      year,
    });

    return res.status(201).json({ success: true, message: "Fee record created", fee });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Fee record already exists for this student/month/year",
      });
    }
    next(err);
  }
};

// @desc Get all fees (admin)
export const getAllFees = async (req, res, next) => {
  try {
    const fees = await feeModel
      .find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    return res.json({ success: true, fees });
  } catch (err) {
    next(err);
  }
};

// @desc Get my fees (student)
export const getMyFees = async (req, res, next) => {
  try {
    const fees = await feeModel
      .find({ student: req.user._id })
      .sort({ year: -1, month: -1 });

    return res.json({ success: true, fees });
  } catch (err) {
    next(err);
  }
};

// @desc Mark a fee as paid (admin)
export const markAsPaid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fee = await feeModel.findByIdAndUpdate(
      id,
      { status: "paid", paidDate: new Date() },
      { new: true },
    );

    if (!fee) {
      return res.status(404).json({ success: false, message: "Fee not found" });
    }

    return res.json({ success: true, message: "Fee marked as paid", fee });
  } catch (err) {
    next(err);
  }
};

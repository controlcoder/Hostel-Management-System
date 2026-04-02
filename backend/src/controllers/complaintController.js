import complaintModel from "../model/complaint.model.js";

// @desc Create a complaint (student)
export const createComplaint = async (req, res, next) => {
  try {
    const { roomNumber, description } = req.body;

    if (!roomNumber || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Room number and description are required" });
    }

    const complaint = await complaintModel.create({
      student: req.user._id,
      studentName: req.user.name,
      roomNumber,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Complaint submitted",
      complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get my complaints (student)
export const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await complaintModel
      .find({ student: req.user._id })
      .sort({ createdAt: -1 });

    return res.json({ success: true, complaints });
  } catch (err) {
    next(err);
  }
};

// @desc Get all complaints (admin)
export const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await complaintModel
      .find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    return res.json({ success: true, complaints });
  } catch (err) {
    next(err);
  }
};

// @desc Resolve a complaint (admin)
export const resolveComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;

    const complaint = await complaintModel.findByIdAndUpdate(
      id,
      { status: "resolved" },
      { new: true },
    );

    if (!complaint) {
      return res
        .status(404)
        .json({ success: false, message: "Complaint not found" });
    }

    return res.json({
      success: true,
      message: "Complaint resolved",
      complaint,
    });
  } catch (err) {
    next(err);
  }
};

import roomRequestModel from "../model/roomRequest.model.js";
import roomModel from "../model/room.model.js";
import userModel from "../model/user.model.js";

// @desc Student requests a specific room
export const createRoomRequest = async (req, res, next) => {
  try {
    const { roomId, reason } = req.body;

    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, message: "Room ID is required" });
    }

    const room = await roomModel.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    if (room.occupants.length >= room.capacity) {
      return res
        .status(400)
        .json({ success: false, message: "This room is already full" });
    }

    // Check if student already has a pending request
    const existing = await roomRequestModel.findOne({
      student: req.user._id,
      status: "pending",
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending room request. Wait for it to be processed.",
      });
    }

    const request = await roomRequestModel.create({
      student: req.user._id,
      studentName: req.user.name,
      room: roomId,
      roomNumber: room.roomNumber,
      reason: reason || "",
    });

    return res.status(201).json({
      success: true,
      message: "Room request submitted!",
      request,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Student views their room requests
export const getMyRequests = async (req, res, next) => {
  try {
    const requests = await roomRequestModel
      .find({ student: req.user._id })
      .populate("room", "roomNumber floor type capacity occupants")
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    next(err);
  }
};

// @desc Admin gets all room requests
export const getAllRequests = async (req, res, next) => {
  try {
    const requests = await roomRequestModel
      .find()
      .populate("student", "name email")
      .populate("room", "roomNumber floor type capacity occupants")
      .sort({ createdAt: -1 });

    return res.json({ success: true, requests });
  } catch (err) {
    next(err);
  }
};

// @desc Admin approves a room request (assigns the student)
export const approveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await roomRequestModel.findById(id);
    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ success: false, message: "Request already processed" });
    }

    const room = await roomModel.findById(request.room);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room no longer exists" });
    }
    if (room.occupants.length >= room.capacity) {
      // Auto-reject since room is now full
      request.status = "rejected";
      await request.save();
      return res
        .status(400)
        .json({ success: false, message: "Room is now full. Request auto-rejected." });
    }

    // Remove student from any previous room
    await roomModel.updateMany(
      { occupants: request.student },
      { $pull: { occupants: request.student } },
    );

    // Assign to new room
    room.occupants.push(request.student);
    await room.save();

    // Update user's room ref
    await userModel.findByIdAndUpdate(request.student, { room: room._id });

    // Approve the request
    request.status = "approved";
    await request.save();

    return res.json({
      success: true,
      message: `Student assigned to room ${room.roomNumber}`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Admin rejects a room request
export const rejectRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await roomRequestModel.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true },
    );

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });
    }

    return res.json({
      success: true,
      message: "Room request rejected",
    });
  } catch (err) {
    next(err);
  }
};

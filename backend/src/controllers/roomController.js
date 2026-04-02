import roomModel from "../model/room.model.js";
import userModel from "../model/user.model.js";

// @desc Get all rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.find().populate("occupants", "name email");
    return res.json({ success: true, rooms });
  } catch (err) {
    next(err);
  }
};

// @desc Create a new room (admin)
export const createRoom = async (req, res, next) => {
  try {
    const { roomNumber, floor, capacity, type } = req.body;

    if (!roomNumber || floor === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Room number and floor are required" });
    }

    const exists = await roomModel.findOne({ roomNumber: roomNumber.toUpperCase() });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Room already exists" });
    }

    const room = await roomModel.create({ roomNumber, floor, capacity, type });
    return res.status(201).json({ success: true, message: "Room created", room });
  } catch (err) {
    next(err);
  }
};

// @desc Assign a student to a room (admin)
export const assignStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "Student ID is required" });
    }

    const room = await roomModel.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (room.occupants.length >= room.capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Room is already full" });
    }

    if (room.occupants.includes(studentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Student is already in this room" });
    }

    // Remove student from any previous room
    await roomModel.updateMany(
      { occupants: studentId },
      { $pull: { occupants: studentId } },
    );

    room.occupants.push(studentId);
    await room.save();

    // Update user's room reference
    await userModel.findByIdAndUpdate(studentId, { room: room._id });

    const populated = await roomModel
      .findById(id)
      .populate("occupants", "name email");

    return res.json({
      success: true,
      message: "Student assigned to room",
      room: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Unassign a student from a room (admin)
export const unassignStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;

    const room = await roomModel.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    room.occupants = room.occupants.filter(
      (occ) => occ.toString() !== studentId,
    );
    await room.save();

    // Clear user's room reference
    await userModel.findByIdAndUpdate(studentId, { room: null });

    const populated = await roomModel
      .findById(id)
      .populate("occupants", "name email");

    return res.json({
      success: true,
      message: "Student removed from room",
      room: populated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a room (admin)
export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await roomModel.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Clear room references for all occupants
    await userModel.updateMany(
      { _id: { $in: room.occupants } },
      { room: null },
    );

    await roomModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Room deleted" });
  } catch (err) {
    next(err);
  }
};

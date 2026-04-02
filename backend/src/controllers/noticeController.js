import noticeModel from "../model/notice.model.js";

// @desc Create a notice (admin)
export const createNotice = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required" });
    }

    const notice = await noticeModel.create({
      title,
      content,
      postedBy: req.user._id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Notice posted", notice });
  } catch (err) {
    next(err);
  }
};

// @desc Get all notices
export const getAllNotices = async (req, res, next) => {
  try {
    const notices = await noticeModel
      .find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    return res.json({ success: true, notices });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a notice (admin)
export const deleteNotice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notice = await noticeModel.findByIdAndDelete(id);
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }

    return res.json({ success: true, message: "Notice deleted" });
  } catch (err) {
    next(err);
  }
};

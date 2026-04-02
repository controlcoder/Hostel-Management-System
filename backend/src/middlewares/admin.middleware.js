const adminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin")
      return res
        .status(401)
        .json({ message: "Unauthorized access, user is not admin" });
    return next();
  } catch (err) {
    next(err);
  }
};

export default adminMiddleware;

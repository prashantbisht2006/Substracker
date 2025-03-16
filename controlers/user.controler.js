import User from "../models/user.model.js";

export const getusers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getuser = async (req, res, next) => {
  try {
    const users = await User.findById(req.params.id).select("-password");

    if (!users) {
      const error = new Error("user not found");
      error.statuscode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

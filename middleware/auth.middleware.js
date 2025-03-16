
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { jwt_secret } from "../config/env.js";


const authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(404).json({ message: "unauthorised" });
    }
    const decode = jwt.verify(token, jwt_secret);
    const user = await User.findById(decode.userId);

    if (!user) return res.status(401).json({ message: "unauthorized user" });
    req.user = user;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
  next();
};

export default authorize;
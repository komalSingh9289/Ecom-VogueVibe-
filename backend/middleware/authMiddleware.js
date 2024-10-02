import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized access, Token not provided",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // Fetch user data from the database, excluding the password
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // If user is not found
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, msg: "User not found, invalid token" });
    }

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(`Error in auth middleware: ${error.message}`);
    return res
      .status(401)
      .json({ success: false, msg: "Unauthorized access, Invalid token" });
  }
};

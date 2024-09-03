import mongoose from "mongoose";
import User from "../model/User.js";
import { generateToken } from "../token/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Started the work");

  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({
      msg: "User already exists! Please login",
      success: false,
    });
  }

  user = await User.create({
    name,
    email,
    password,
  });
  return res.status(200).json({
    msg: "User registered successfully",
    success: true,
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in...");

  try {
    // Finding the user by email
    const user = await User.findOne({ email: email });

    // If the user is not found
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found. Kindly check your email.",
      });
    }

    console.log(user);

    // Use the instance method to compare passwords
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect password. Please try again.",
      });
    }

    // Generate a token after a successful login
    let token = await generateToken(user._id, res);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Send the response back to the user
    return res.status(200).json({
      success: true,
      msg: "User login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getUser = async (req, res) => {
  console.log("Session Id", req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err, "error");
      return res.status(404).json({ success: false, msg: "Unauthorised" });
    }
    console.log("Inside session store");
    console.log(sessionData);
    if (!sessionData) {
      return res.status(401).json({
        msg: "You are unauthorised",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "You are authorised",
      success: true,
      sessionData,
    });
  });
};

export const checkAuth = async (req, res) => {
  let userId = req.userId;
  console.log(userId);
  userId = new mongoose.Types.ObjectId(userId);
  let user = await User.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      msg: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    user,
    msg: "Login success",
  });
};

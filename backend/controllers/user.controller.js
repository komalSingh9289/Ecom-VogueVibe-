import mongoose from "mongoose";
import User from "../models/user.model.js";

export const adduser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required credentials",
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      phone,
      address,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Error in adding user:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Try again later.",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataToBeUpdated = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, dataToBeUpdated, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update User" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const getuser = await User.findByIdAndDelete(id);

    if (!getuser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User Removed" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove the user!" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No user found" });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve users" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const user = await userExists.passwordValidation(password);
    if (user) {
      return res
        .status(201)
        .json({
          success: true,
          message: "Login Successful",
          token: await userExists.generateToken(),
          userId: userExists._id.toString(),
        });
    }else{
      return res.status(401).json({ success: false, message: "Invalid email or password " });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};

export const logData = async(req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData});
  } catch (error) {
    console.log(`Error from the user route: ${error}`);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};


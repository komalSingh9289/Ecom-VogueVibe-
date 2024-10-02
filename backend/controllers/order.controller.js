import Order from "../models/order.model.js";
import mongoose from "mongoose";

export const AddOrder = async (req, res) => {
  const order = req.body;
  if (!order) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }
  const newOrder = new Order(order);

  try {
    await newOrder.save();
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add order" });
  }
};

export const getUserOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const orders = await Order.find({
      "cartItems.0.userId": id, // Assuming userId is stored in the first item of cartItems
    });

    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "no order found" });
    }

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching order history", error });
  }
};

export const updateUserOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "ordered") {
      return res.status(400).json({ message: "Order cannot be canceled" });
    }

    order.status = "canceled";
    await order.save();

    res.json({ message: "Order canceled successfully!" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error canceling order", error });
  }
};

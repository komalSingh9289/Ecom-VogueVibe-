import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartItems: {
      type: Array,
      ref: "Cart" ,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

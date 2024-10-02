import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const cart = req.body;
  const newCart = new Cart(cart);

  try {
    await newCart.save();
    return res.status(201).json({ success: true, data: newCart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add product to cart" });
  }
};

export const userCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  const cart = await Cart.find({ userId: id }).populate(
    "productId",
    "name price"
  );
  if (!cart) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  return res.status(200).json({ data: cart });
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }

  try {
    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const emptyCart = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Id" });
  }
  try {
    const result = await Cart.deleteMany({ userId: id });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cart items found for this user" });
    }

    // If deletion was successful
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      deletedCount: result.deletedCount, // Number of deleted items
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

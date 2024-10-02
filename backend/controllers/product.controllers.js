import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getproducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error); // Better practice for logging errors
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve products" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.price ||
    !product.quantity ||
    !product.description ||
    !product.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(error); // Better practice for logging errors
    return res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error); // Better practice for logging errors
    return res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error(error); // Better practice for logging errors
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

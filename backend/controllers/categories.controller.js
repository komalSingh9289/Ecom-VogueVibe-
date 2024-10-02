import mongoose from "mongoose";
import Category from "../models/categories.model.js";

export const createCategory = async (req, res) => {
  const category = req.body;
  if (!category.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  const newCategory = new Category(category);

  try {
    await newCategory.save();
    return res
      .status(201)
      .json({ success: true, message: "Category Added", data: newCategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    if (category.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Category Found" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Id" });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error(error); 
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete category" });
  }
};

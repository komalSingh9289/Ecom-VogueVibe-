import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getproducts,
  updateProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();
router.get("/", getproducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;

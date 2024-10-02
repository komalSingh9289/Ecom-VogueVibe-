import express from "express";
import { addToCart, userCart, deleteCart, emptyCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:id", userCart);
router.delete("/:id", deleteCart);
router.delete('/clear/:id', emptyCart);

export default router;
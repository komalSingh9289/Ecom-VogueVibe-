import express from "express";
import { AddOrder, getUserOrder, updateUserOrder} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", AddOrder);
router.get("/:id", getUserOrder);
router.put("/cancel/:id", updateUserOrder);


export default router;

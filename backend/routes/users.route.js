import express from "express";
import {
  adduser,
  deleteUser,
  getUsers,
  loginUser,
  updateUser,
  logData,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", adduser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);
router.post("/login", loginUser);
router.get("/logData", authMiddleware, logData);



export default router;

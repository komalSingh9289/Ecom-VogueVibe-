import express from 'express';
import { createCategory, deleteCategory, getCategory } from '../controllers/categories.controller.js';


const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategory);
router.delete("/:id", deleteCategory);

export default router;
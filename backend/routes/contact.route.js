import e from "express";
import { contactForm } from "../controllers/contact.controller.js";

const router = e.Router();

router.post("/", contactForm);

export default router;
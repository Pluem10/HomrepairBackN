import express from "express";
import { register, login, createAdmin } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();
// POST Local:5000 /api/auth/register
router.post("/register", validateBody(["name", "phone", "password"]), register);
// POST Local:5000 /api/auth/login
router.post("/login", validateBody(["phone", "password"]), login);

// optional: สร้างแอดมินครั้งแรก
router.post("/create-admin", validateBody(["name", "phone", "password"]), createAdmin);

export default router;

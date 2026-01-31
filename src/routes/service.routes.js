import express from "express";
import {
  getServices,
  createService,
  updateService,
  deleteService
} from "../controllers/service.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();
// Get Local:5000/api/services
router.get("/", getServices);

// Post Local:5000/api/services
router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  validateBody(["name", "description", "price", "coverUrl"]),
  createService
);
// Put Local:5000/api/services/:id เเอดมินทําได้

router.put("/:id", requireAuth, requireRole("admin"), updateService);
// Delete Local:5000/api/services/:id เเอดมินทําได้
router.delete("/:id", requireAuth, requireRole("admin"), deleteService);

export default router;

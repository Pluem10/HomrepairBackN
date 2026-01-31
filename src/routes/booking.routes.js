    import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getAllBookings,
  updateBookingStatus
} from "../controllers/booking.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { validateBody, validateFutureDate } from "../middlewares/validate.middleware.js";

const router = express.Router();

// customer จอง
// POST local:5000/api/bookings
router.post(
  "/",
  requireAuth,
  requireRole("customer", "admin"),
  validateBody(["serviceId", "customerName", "phone", "address", "appointmentAt"]),
  validateFutureDate("appointmentAt"),
  createBooking
);

// customer ดูของตัวเอง / admin ดูของใครก็ได้
// GET local:5000/api/bookings/:user
router.get("/:user", requireAuth, getBookingsByUser);

// admin ดูคิวทั้งหมด
// GET local:5000/api/bookings
router.get("/", requireAuth, requireRole("admin"), getAllBookings);

// admin เปลี่ยนสถานะ
// PATCH local:5000/api/bookings/:id/status
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  validateBody(["status"]),
  updateBookingStatus
);

export default router;

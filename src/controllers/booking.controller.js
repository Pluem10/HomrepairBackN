    import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export async function createBooking(req, res, next) {
  try {
    const userId = req.user.id;
    const { serviceId, customerName, phone, address, appointmentAt, note } = req.body;

    // ตรวจว่าบริการมีจริง
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const booking = await Booking.create({
      serviceId,
      userId,
      customerName,
      phone,
      address,
      appointmentAt,
      note
    });

    res.status(201).json({ message: "Booking created", data: booking });
  } catch (err) {
    next(err);
  }
}

// ลูกค้าดูประวัติของตัวเอง หรือ admin ดูของใครก็ได้
export async function getBookingsByUser(req, res, next) {
  try {
    const { user } = req.params;

    // customer ห้ามดูของคนอื่น
    if (req.user.role === "customer" && req.user.id !== user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const bookings = await Booking.find({ userId: user })
      .populate("serviceId", "name price coverUrl")
      .sort({ createdAt: -1 });

    res.json({ data: bookings });
  } catch (err) {
    next(err);
  }
}

// admin ดูคิวทั้งหมด
export async function getAllBookings(req, res, next) {
  try {
    const bookings = await Booking.find()
      .populate("serviceId", "name price coverUrl")
      .populate("userId", "name phone role")
      .sort({ appointmentAt: 1 });

    res.json({ data: bookings });
  } catch (err) {
    next(err);
  }
}

// admin เปลี่ยนสถานะ
export async function updateBookingStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("serviceId", "name price coverUrl")
      .populate("userId", "name phone role");

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Status updated", data: updated });
  } catch (err) {
    next(err);
  }
}

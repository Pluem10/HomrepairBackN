import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    note: { type: String, trim: true },

    appointmentAt: { type: Date, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// กันการจองซ้ำแบบง่าย (คนเดิม+บริการเดิม+เวลาเดิม)
bookingSchema.index({ userId: 1, serviceId: 1, appointmentAt: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);

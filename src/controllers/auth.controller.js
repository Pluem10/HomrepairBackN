import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

export async function register(req, res, next) {
  try {
    const { name, phone, email, password } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) return res.status(409).json({ message: "Phone already used" });

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash,
      role: "customer"
    });

    return res.status(201).json({
      message: "Register success",
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id.toString(), role: user.role, name: user.name });

    return res.json({
      message: "Login success",
      token,
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

// สร้าง admin ครั้งแรก (optional แต่ช่วยมาก)
// เรียก endpoint นี้ครั้งเดียว แล้วปิด/ลบได้ถ้าต้องการ
export async function createAdmin(req, res, next) {
  try {
    const { name, phone, email, password } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) return res.status(409).json({ message: "Phone already used" });

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash,
      role: "admin"
    });

    return res.status(201).json({
      message: "Admin created",
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

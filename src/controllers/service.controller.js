import Service from "../models/Service.js";

export async function getServices(req, res, next) {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ data: services });
  } catch (err) {
    next(err);
  }
}

export async function createService(req, res, next) {
  try {
    const { name, description, price, coverUrl, durationMins, isActive } = req.body;

    const service = await Service.create({
      name,
      description,
      price,
      coverUrl,
      durationMins,
      isActive
    });

    res.status(201).json({ message: "Service created", data: service });
  } catch (err) {
    next(err);
  }
}

export async function updateService(req, res, next) {
  try {
    const { id } = req.params;

    const updated = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service updated", data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteService(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service deleted" });
  } catch (err) {
    next(err);
  }
}

export function notFound(req, res, next) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  // Mongoose duplicate key
  if (err?.code === 11000) {
    return res.status(409).json({ message: "Duplicate key", detail: err.keyValue });
  }

  // Mongoose validation
  if (err?.name === "ValidationError") {
    return res.status(400).json({ message: "ValidationError", detail: err.message });
  }

  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
}

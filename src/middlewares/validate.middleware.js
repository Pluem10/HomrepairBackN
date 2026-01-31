import mongoose from "mongoose";

export function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    for (const f of requiredFields) {
      if (req.body?.[f] === undefined || req.body?.[f] === null || req.body?.[f] === "") {
        return res.status(400).json({ message: `Missing field: ${f}` });
      }
    }
    next();
  };
}

export function validateFutureDate(fieldName) {
  return (req, res, next) => {
    const value = req.body?.[fieldName];
    const dt = new Date(value);
    if (!value || Number.isNaN(dt.getTime())) {
      return res.status(400).json({ message: `Invalid date: ${fieldName}` });
    }
    if (dt.getTime() < Date.now()) {
      return res.status(400).json({ message: `${fieldName} must be in the future` });
    }
    next();
  };
}

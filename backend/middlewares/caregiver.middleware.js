exports.caregiverMiddleware = async (req, res, next) => {
  if (req.user.role === "caregiver") return next();

  return res.status(401).json({ message: "Unauthorized" });
};

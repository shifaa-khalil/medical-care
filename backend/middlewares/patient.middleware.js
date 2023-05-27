exports.patientMiddleware = async (req, res, next) => {
  if (req.user.role === "patient") return next();

  return res.status(401).json({ message: "Unauthorized" });
};

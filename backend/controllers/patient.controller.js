const User = require("../models/user.model");

exports.getPatients = async (req, res) => {
  User.find({ role: "patient" })
    .exec()
    .then((patients) => {
      res.json(patients);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

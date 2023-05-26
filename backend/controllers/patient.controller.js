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

exports.dropPatient = async (req, res) => {
  User.findOneAndDelete({ _id: req.params.patient_id })
    .exec()
    .then((droppedPatient) => {
      if (droppedPatient)
        res.json({ message: "patient dropped", droppedPatient });
      else res.json({ message: "patient not found" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

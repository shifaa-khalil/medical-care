const User = require("../models/user.model");
const mailController = require("./mail.controller");

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
  try {
    const droppedPatient = await User.findOneAndDelete({
      _id: req.params.patient_id,
    }).exec();
    if (droppedPatient) {
      const recipientEmail = droppedPatient.email;
      const recipientName = droppedPatient.name;

      const caregiver = await User.findOne({ _id: req.user._id });
      const caregiverName = caregiver.name;

      const subject = "You have been dropped by " + caregiverName;
      const content =
        "Dear " +
        recipientName +
        ",\n\nYou have been dropped by " +
        caregiverName +
        ", you no longer need to take any more medications, you will no more receive emails from us.\n\nBest";

      mailController.sendNotificationEmail(recipientEmail, subject, content);

      res.json({ message: "patient dropped", droppedPatient });
    } else res.json({ message: "patient not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

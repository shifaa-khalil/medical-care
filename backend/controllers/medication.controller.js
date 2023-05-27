const Medication = require("../models/medication.model");
const mailController = require("./mail.controller");
const User = require("../models/user.model");

exports.getMedications = async (req, res) => {
  Medication.find({ patient_id: req.params.patient_id })
    .exec()
    .then((medications) => {
      res.json(medications);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.addMedication = async (req, res) => {
  try {
    const medication = new Medication({
      name: req.body.name,
      usage: req.body.usage,
      patient_id: req.params.patient_id,
      caregiver_id: req.user._id,
    });

    await medication.save();

    const recipient = await User.findOne({ _id: req.params.patient_id });
    const recipientEmail = recipient.email;
    const recipientName = recipient.name;

    const caregiver = await User.findOne({ _id: req.user._id });
    const caregiverName = caregiver.name;

    const subject = "Medication Added by " + caregiverName;
    const content =
      "Dear " +
      recipientName +
      ",\n\nA new medication has been added for you!\nMedication: " +
      req.body.name +
      "\nUsage: " +
      req.body.usage +
      "\nAdded by: " +
      caregiverName +
      "\n\nBest";
    mailController.sendNotificationEmail(recipientEmail, subject, content);

    res.json({
      message: "added successfully",
      medication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add medication" });
  }
};

exports.dropMedication = async (req, res) => {
  try {
    const droppedMedication = await Medication.findOneAndDelete({
      _id: req.params.medication_id,
    }).exec();

    if (droppedMedication) {
      const recipient = await User.findOne({
        _id: droppedMedication.patient_id,
      });
      const recipientEmail = recipient.email;
      const recipientName = recipient.name;

      const caregiver = await User.findOne({ _id: req.user._id });
      const caregiverName = caregiver.name;

      const subject = "Medication dropped by " + caregiverName;
      const content =
        "Dear " +
        recipientName +
        ",\n\nA medication has been dropped!\nMedication: " +
        droppedMedication.name +
        "\nDropped by: " +
        caregiverName +
        "\n\nBest";
      mailController.sendNotificationEmail(recipientEmail, subject, content);

      res.json({ message: "Medication dropped", droppedMedication });
    } else {
      res.json({ message: "Medication not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editMedication = async (req, res) => {
  try {
    const updatedMedication = await Medication.findOneAndUpdate(
      { _id: req.params.medication_id },
      { $set: req.body.data },
      { new: true }
    );

    if (updatedMedication) {
      console.log("Medication updated:", updatedMedication);
    } else {
      console.log("Medication doesn't exist");
    }
    // const medication = new Medication({
    //   name: req.body.name,
    //   usage: req.body.usage,
    //   patient_id: req.params.patient_id,
    //   caregiver_id: req.user._id,
    // });

    // await medication.save();

    // const recipient = await User.findOne({ _id: req.params.patient_id });
    // const recipientEmail = recipient.email;
    // const recipientName = recipient.name;

    // const caregiver = await User.findOne({ _id: req.user._id });
    // const caregiverName = caregiver.name;

    // const subject = "Medication Added by " + caregiverName;
    // const content =
    //   "Dear " +
    //   recipientName +
    //   ",\n\nA new medication has been added for you!\nMedication: " +
    //   req.body.name +
    //   "\nUsage: " +
    //   req.body.usage +
    //   "\nAdded by: " +
    //   caregiverName +
    //   "\n\nBest";
    // mailController.sendNotificationEmail(recipientEmail, subject, content);

    res.json({
      message: "added successfully",
      updatedMedication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add medication" });
  }
};

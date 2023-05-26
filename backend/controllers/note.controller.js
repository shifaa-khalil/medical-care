const Note = require("../models/note.model");
const mailController = require("./mail.controller");

exports.addNote = async (req, res) => {
  try {
    const note = new Note({
      content: req.body.name,
      patient_id: req.params.patient_id,
      caregiver_id: req.user._id,
    });

    // await note.save();

    const recipientEmail = "shifaakhalil192@gmail.com";
    const subject = "Note";
    const content = "Please do not change the dosage";
    mailController.sendNotificationEmail(recipientEmail, subject, content);
    console.log(recipientEmail, subject, content);

    res.json({
      message: "added successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add note" });
  }
};

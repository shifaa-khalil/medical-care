const Note = require("../models/note.model");
const mailController = require("./mail.controller");
const User = require("../models/user.model");

exports.addNote = async (req, res) => {
  try {
    const note = new Note({
      content: req.body.content,
      patient_id: req.params.patient_id,
      caregiver_id: req.user._id,
    });

    await note.save();

    const recipient = await User.findOne({ _id: req.params.patient_id });
    const recipientEmail = recipient.email;

    const caregiver = await User.findOne({ _id: req.user._id });
    const caregiverName = caregiver.name;

    const subject = "Note Added by " + caregiverName;
    const content = note.content;
    mailController.sendNotificationEmail(recipientEmail, subject, content);

    res.json({
      message: "added successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add note" });
  }
};

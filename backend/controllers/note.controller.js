const Note = require("../models/note.model");

exports.addNote = async (req, res) => {
  try {
    const note = new Note({
      content: req.body.name,
      patient_id: req.params.patient_id,
      caregiver_id: req.user._id,
    });

    await note.save();

    res.json({
      message: "added successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add note" });
  }
};

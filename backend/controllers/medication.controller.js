const Medication = require("../models/medication.model");

exports.addMedication = async (req, res) => {
  try {
    const medication = new Medication({
      name: req.body.name,
      usage: req.body.usage,
      patient_id: req.params.patient_id,
      caregiver_id: req.user._id,
    });

    await medication.save();

    res.json({
      message: "added successfully",
      medication: medication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add medication" });
  }
};

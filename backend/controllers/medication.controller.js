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

exports.dropMedication = async (req, res) => {
  Medication.findOneAndDelete({ _id: req.params.medication_id })
    .exec()
    .then((droppedMedication) => {
      if (droppedMedication)
        res.json({ message: "medication dropped", droppedMedication });
      else res.json({ message: "medication not found" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

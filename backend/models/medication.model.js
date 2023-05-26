const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usage: {
    type: String,
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  caregiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Medication = mongoose.model("Medication", medicationSchema);

module.exports = Medication;

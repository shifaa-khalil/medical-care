const { Router } = require("express");
const {
  getMedications,
  addMedication,
  dropMedication,
} = require("../controllers/medication.controller");

const router = Router();

router.get("/medications/:patient_id", getMedications);
router.post("/medication/:patient_id", addMedication);
router.delete("/medication/:medication_id", dropMedication);

module.exports = router;

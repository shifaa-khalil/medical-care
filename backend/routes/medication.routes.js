const { Router } = require("express");
const {
  getMedications,
  addMedication,
  editMedication,
  dropMedication,
} = require("../controllers/medication.controller");

const router = Router();

router.get("/medications/:patient_id", getMedications);
router.post("/medication/:patient_id", addMedication);
router.put("/medication/:medication_id", editMedication);
router.delete("/medication/:medication_id", dropMedication);

module.exports = router;

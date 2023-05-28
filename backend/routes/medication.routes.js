const { Router } = require("express");
const {
  getMedications,
  addMedication,
  editMedication,
  dropMedication,
  getMyMedications,
} = require("../controllers/medication.controller");

const { patientMiddleware } = require("../middlewares/patient.middleware");
// const { caregiverMiddleware } = require("./middlewares/caregiver.middleware");

const router = Router();

router.get("/medications", patientMiddleware, getMyMedications);

router.get("/medications/:patient_id", getMedications);
router.post("/medication/:patient_id", addMedication);
router.put("/medication/:medication_id", editMedication);
router.delete("/medication/:medication_id", dropMedication);

module.exports = router;

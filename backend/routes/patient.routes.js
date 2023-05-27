const { Router } = require("express");
const {
  getPatients,
  getPatient,
  dropPatient,
} = require("../controllers/patient.controller");

const router = Router();

router.get("/patients", getPatients);
router.get("/patient/:patient_id", getPatient);
router.delete("/patient/:patient_id", dropPatient);

module.exports = router;

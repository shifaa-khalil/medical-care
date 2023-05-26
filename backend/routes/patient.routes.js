const { Router } = require("express");
const {
  getPatients,
  dropPatient,
} = require("../controllers/patient.controller");

const router = Router();

router.get("/patients", getPatients);
router.delete("/patient/:patient_id", dropPatient);

module.exports = router;

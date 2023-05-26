const { Router } = require("express");
const {
  addMedication,
  dropMedication,
} = require("../controllers/medication.controller");

const router = Router();

router.post("/medication/:patient_id", addMedication);
router.delete("/medication/:medication_id", dropMedication);

module.exports = router;

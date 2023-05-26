const { Router } = require("express");
const { addMedication } = require("../controllers/medication.controller");

const router = Router();

router.post("/medication/:patient_id", addMedication);

module.exports = router;

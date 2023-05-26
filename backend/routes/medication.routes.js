const { Router } = require("express");
const { addMedication } = require("../controllers/medication.controller");

const router = Router();
const { caregiverMiddleware } = require("../middlewares/caregiver.middleware");

router.post("/medication/:patient_id", caregiverMiddleware, addMedication);

module.exports = router;

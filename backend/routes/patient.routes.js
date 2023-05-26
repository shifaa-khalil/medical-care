const { Router } = require("express");
const { getPatients } = require("../controllers/patient.controller");

const router = Router();

router.get("/patients", getPatients);

module.exports = router;

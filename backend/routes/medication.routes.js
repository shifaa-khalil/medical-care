const { Router } = require("express");
const { addMedication } = require("../controllers/medication.controller");

const router = Router();
// const { careGiverMiddleware} = require("../middlewares/careGiver.middleware");

// router.post("/medication", careGiverMiddleware, addMedication);

module.exports = router;

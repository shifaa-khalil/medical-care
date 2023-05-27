const { Router } = require("express");
const { caregiverMiddleware } = require("../middlewares/caregiver.middleware");
const { patientMiddleware } = require("../middlewares/patient.middleware");
const { addNote, getNotes } = require("../controllers/note.controller");

const router = Router();

router.post("/note/:patient_id", caregiverMiddleware, addNote);
router.get("/notes", patientMiddleware, getNotes);

module.exports = router;

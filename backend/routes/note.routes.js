const { Router } = require("express");
const { addNote } = require("../controllers/note.controller");
const { caregiverMiddleware } = require("./middlewares/caregiver.middleware");

const router = Router();

router.post("/note/:patient_id", caregiverMiddleware, addNote);
router.get("/notes", patientMiddleware, getNotes);

module.exports = router;

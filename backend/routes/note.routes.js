const { Router } = require("express");
const { addNote } = require("../controllers/note.controller");

const router = Router();

router.post("/note/:patient_id", addNote);

module.exports = router;

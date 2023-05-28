require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./configs/db.config");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { caregiverMiddleware } = require("./middlewares/caregiver.middleware");
const app = express();

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const medicationRouter = require("./routes/medication.routes");
app.use("/", authMiddleware, medicationRouter);

const patientRouter = require("./routes/patient.routes");
app.use("/", caregiverMiddleware, patientRouter);

const noteRouter = require("./routes/note.routes");
app.use("/", noteRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT || 3000);
  connectDB();
});

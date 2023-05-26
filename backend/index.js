require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configs/db.config");
const { authMiddleware } = require("./middlewares/auth.middleware");
const { caregiverMiddleware } = require("./middlewares/caregiver.middleware");

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const medicationRouter = require("./routes/medication.routes");
app.use("/", authMiddleware, medicationRouter);

const patientRouter = require("./routes/patient.routes");
app.use("/", caregiverMiddleware, patientRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT || 3000);
  connectDB();
});

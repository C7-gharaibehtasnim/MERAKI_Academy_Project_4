const express = require("express");
const cors = require("cors");
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;
require("./models/db");

const doctorsRouter = require("./routes/doctor");
const patientRouter = require("./routes/patient");
const clinicRouter = require("./routes/clinic");
const appointmentRouter = require("./routes/appointment");
const adminRouter = require("./routes/admin");





app.use(cors());
app.use(express.json());
app.use("/doctor", doctorsRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);
app.use("/clinic", clinicRouter);
app.use("/admin", adminRouter);






// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


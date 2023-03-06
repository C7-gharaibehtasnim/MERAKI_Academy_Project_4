const express = require("express");
const { login } = require("../controllers/patient");
const patientRouter = express.Router();
const { register,updateprofile } = require("../controllers/patient");
const{getAppointmentBypatientID}=require("../controllers/appointment");
const authentication = require("../middleware/authentication");
const authorization=require("../middleware/authorization")

patientRouter.post("/register", register);
patientRouter.post("/login", login);

patientRouter.post("/appointment", authentication,authorization("CANCEL_APPOINTMENT"),getAppointmentBypatientID);
patientRouter.get("/update/:id", authentication,authorization("CANCEL_APPOINTMENT"), updateprofile);


module.exports = patientRouter;

const express = require("express");
const doctorRouter = express.Router();
const authentication=require("../middleware/authentication")


const{getAppointmentBydoctorID}=require("../controllers/appointment")
const { register,login,updateprofile} = require("../controllers/doctor");
const authorization = require("../middleware/authorization");



doctorRouter.post("/register", register);
doctorRouter.post("/login", login);
doctorRouter.get("/appointment", authentication,authorization("CANCEL_APPOINTMENT"), getAppointmentBydoctorID);
doctorRouter.get("/update/:id", authentication,authorization("CANCEL_APPOINTMENT"), updateprofile);



module.exports = doctorRouter;

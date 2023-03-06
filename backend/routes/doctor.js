const express = require("express");
const doctorRouter = express.Router();
const authentication=require("../middleware/authentication")


const{getAppointmentBydoctorID}=require("../controllers/appointment")
const { register,login,updateprofile,addDoctor} = require("../controllers/doctor");
const authorization = require("../middleware/authorization");



doctorRouter.post("/register", register);
doctorRouter.post("/login", login);
doctorRouter.post("/add", addDoctor);

doctorRouter.get("/appointment", authentication,authorization("CANCEL_APPOINTMENT"), getAppointmentBydoctorID);
doctorRouter.put("/update/:id", authentication,authorization("CANCEL_APPOINTMENT"), updateprofile);



module.exports = doctorRouter;

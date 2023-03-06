const express = require("express");
const appointmentRouter = express.Router();
const {bookAnAppointment}=require("../controllers/appointment")
const authentication=require("../middleware/authentication")


appointmentRouter.post("/",authentication, bookAnAppointment);

module.exports = appointmentRouter;

const express = require("express");
const appointmentRouter = express.Router();
const {
  bookAnAppointment,
  deleteAppoitment,
  UpdateAppoitment,checkDate,cancelationEmail
} = require("../controllers/appointment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

appointmentRouter.post("/", authentication,authorization("CREATE_APPOINTMENT"), bookAnAppointment);
appointmentRouter.delete("/delete/:appointmentid", authentication, authorization("DELETE_APPOINTMENT"),deleteAppoitment);
appointmentRouter.put("/update/:appointmentid", authentication, authorization("UPDATE_APPOINTMENT"),UpdateAppoitment);
appointmentRouter.get("/check/:docid",checkDate);
appointmentRouter.post("/cancelemail",cancelationEmail)
module.exports = appointmentRouter;

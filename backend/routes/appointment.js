const express = require("express");
const appointmentRouter = express.Router();
const {
  bookAnAppointment,
  deleteAppoitment,
  UpdateAppoitment
} = require("../controllers/appointment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

appointmentRouter.post("/", authentication,authorization("CREATE_APPOINTMENT"), bookAnAppointment);
appointmentRouter.delete("/delete/:appointmentid", authentication, authorization("CANCEL_APPOINTMENT"),deleteAppoitment);
appointmentRouter.put("/update/:appointmentid", authentication, authorization("CANCEL_APPOINTMENT"),UpdateAppoitment);

module.exports = appointmentRouter;

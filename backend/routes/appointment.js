const express = require("express");
const appointmentRouter = express.Router();
const {
  bookAnAppointment,
  deleteAppoitment,
  UpdateAppoitment,checkDate
} = require("../controllers/appointment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

appointmentRouter.post("/", authentication,authorization("CREATE_APPOINTMENT"), bookAnAppointment);
appointmentRouter.delete("/delete/:appointmentid", authentication, authorization("DELETE_APPOINTMENT"),deleteAppoitment);
appointmentRouter.put("/update/:appointmentid", authentication, authorization("UPDATE_APPOINTMENT"),UpdateAppoitment);
appointmentRouter.get("/check/:docid",checkDate);

module.exports = appointmentRouter;

const express = require("express");
const doctorRouter = express.Router();
const authentication = require("../middleware/authentication");

const { getAppointmentBydoctorID } = require("../controllers/appointment");
const {
  register,
  login,
  updateprofile,
  addDoctor,
  deleteDoctor,
  veiwProfile,
} = require("../controllers/doctor");
const authorization = require("../middleware/authorization");

doctorRouter.post("/register", register);
doctorRouter.post("/login", login);
doctorRouter.post("/add", addDoctor);
doctorRouter.delete(
  "/delete/:id",
  authentication,
  authorization("DELETE_DOCTOR"),
  deleteDoctor
);
doctorRouter.get(
  "/:id",
  authentication,
  authorization("VEIW_PROFILE"),
  veiwProfile
);

doctorRouter.get(
  "/appointment",
  authentication,
  authorization("GET_MY_APPOINTMENT"),
  getAppointmentBydoctorID
);
doctorRouter.put(
  "/update/:id",
  authentication,
  authorization("UPDATE_PROFILE"),
  updateprofile
);

module.exports = doctorRouter;

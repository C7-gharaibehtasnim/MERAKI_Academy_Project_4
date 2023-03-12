const express = require("express");
const doctorRouter = express.Router();
const authentication = require("../middleware/authentication");

const { getAppointmentBydoctorID } = require("../controllers/appointment");
const {
  register,
  veiwdoctorsbyclinicid,
  //login,
  updateprofile,
  addDoctor,
  deleteDoctor,
  veiwProfile,checkDate
} = require("../controllers/doctor");
const authorization = require("../middleware/authorization");
const { genrateToken } = require("../controllers/config");

doctorRouter.post("/register", register);
//doctorRouter.post("/login", login,genrateToken);
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
doctorRouter.get(
  "/clinic/:id",
  
  veiwdoctorsbyclinicid
);
doctorRouter.get(
  "/check/:id",
  
  veiwdoctorsbyclinicid
);

module.exports = doctorRouter;

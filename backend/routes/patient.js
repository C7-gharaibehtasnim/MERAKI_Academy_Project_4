const express = require("express");
const {genrateToken}=require("../controllers/config")
const { login } = require("../controllers/patient");
const patientRouter = express.Router();
const {
  register,
  updateprofile,
  deletePatient,veiwProfile
} = require("../controllers/patient");
const { getAppointmentBypatientID } = require("../controllers/appointment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

patientRouter.post("/register", register);
//patientRouter.post("/login", login,genrateToken);
patientRouter.delete(
  "/delete/:id",
  authentication,
  authorization("CANCEL_APPOINTMENT"),
  deletePatient
);

patientRouter.get(
  "/appointment",
  authentication,
  authorization("GET_MY_APPOINTMENT"),
  getAppointmentBypatientID
);
patientRouter.put(
  "/update/:id",
  authentication,
  authorization("UPDATE_PROFILE"),
  updateprofile
);
patientRouter.get(
    "/:id",
    authentication,
    authorization("VEIW_PROFILE"),
    veiwProfile
  );
module.exports = patientRouter;

const express = require("express");
const { login } = require("../controllers/patient");
const patientRouter = express.Router();
const { register } = require("../controllers/patient");



patientRouter.post("/register", register);
patientRouter.post("/login", login);



module.exports = patientRouter;

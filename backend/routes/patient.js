const express = require("express");
const patientRouter = express.Router();
const { register } = require("../controllers/patient");



patientRouter.post("/register", register);

module.exports = patientRouter;

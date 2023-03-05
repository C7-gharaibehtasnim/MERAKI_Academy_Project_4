const express = require("express");
const doctorRouter = express.Router();




const { register } = require("../controllers/doctor");



doctorRouter.post("/register", register);


module.exports = doctorRouter;

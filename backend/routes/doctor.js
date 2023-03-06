const express = require("express");
const doctorRouter = express.Router();




const { register,login } = require("../controllers/doctor");



doctorRouter.post("/register", register);
doctorRouter.post("/login", login);



module.exports = doctorRouter;

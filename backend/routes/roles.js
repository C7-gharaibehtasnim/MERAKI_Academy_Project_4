const express = require("express");

// Import roles controller
const { createNewRole,getrolebyrolename } = require("../controllers/roles");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {login}=require("../controllers/patient");
const loginDoctor = require("../middleware/logindoctor");

// Create roles router
const rolesRouter = express.Router();



// rolesRouter.post("/", createNewRole);
rolesRouter.get("/", getrolebyrolename);
rolesRouter.post("/login",loginDoctor,login);


module.exports = rolesRouter;
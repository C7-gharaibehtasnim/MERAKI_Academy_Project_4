const express = require("express");

// Import roles controller
const { createNewRole,getrolebyrolename } = require("../controllers/roles");

// Create roles router
const rolesRouter = express.Router();



rolesRouter.post("/", createNewRole);
rolesRouter.get("/", getrolebyrolename);


module.exports = rolesRouter;
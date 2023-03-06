const express = require("express");
const clinicRouter = express.Router();
const {newclinic}=require("../controllers/clinic")
const{authorization}=require("../middleware/authorization")

clinicRouter.post("/",newclinic);

module.exports = clinicRouter;

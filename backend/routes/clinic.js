const express = require("express");
const clinicRouter = express.Router();
const {newclinic,getAllclinics,updateclinic,deleteclinic}=require("../controllers/clinic");
const authentication = require("../middleware/authentication");
const authorization=require("../middleware/authorization")

clinicRouter.post("/",authentication,authorization("ADD_CLINIC"),newclinic);
clinicRouter.get("/",getAllclinics);
clinicRouter.put("/:id",authentication,authorization("UPDATE_CLINIC"),updateclinic);
clinicRouter.delete("/:id",authentication,authorization("DELETE_CLINIC"),deleteclinic)

module.exports = clinicRouter;

const express = require("express");
const adminRouter = express.Router();
const {register}=require("../controllers/admin");
const { login } = require("../controllers/admin");
adminRouter.post("/register", register);
adminRouter.post("/login", login);


module.exports = adminRouter;

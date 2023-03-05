const doctorModel = require("../models/doctorSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const {
    image,
    firstName,
    lastName,
    email,
    password,
    insurance,
    appointments,
    clinic,
    role,
  } = req.body;
  const doctor = new doctorModel({
    image,
    firstName,
    lastName,
    email,
    password,
    insurance,
    appointments,
    clinic,
    role,
  });

  doctor
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
  
};
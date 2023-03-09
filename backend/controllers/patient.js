const { genrateToken } = require("./config");
const patientModel = require("../models/patientSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const register = (req, res) => {
  console.log("dsfsf");
  const {
    firstName,
    lastName,
    email,
    password,
    insurance,
    appointments,
    role,
  } = req.body;
  const patient = new patientModel({
    firstName,
    lastName,
    email,
    password,
    insurance,
    role,
    appointments,
  });

  patient
    .save()
    .then((result) => {
      //console.log(result)
      //console.log(result._id)
      patientModel
        .find({ role })
        .populate("role")
        .exec()
        .then((response) => {
          console.log("sdfFwfWEFWEFWEFWEFWEF" + response);
          const payload = {
            userId: result._id,

            role: response.role,
          };

          const options = {
            expiresIn: "24h",
          };
          const token = genrateToken(payload, options);

          res.status(201).json({
            success: true,
            message: `Account Created Successfully`,
            author: result,
            token: token,
          });
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
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  patientModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      console.log(result + "HIIIIIIII");
        if (!result) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
       }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        console.log("token result /n" + result);
        const payload = {
          userId: result._id,

          role: result.role,
        };

        const options = {
          expiresIn: "24h",
        };
        const token = genrateToken(payload, options);

        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          role:result.role.role
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateprofile = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  patientModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newProfile) => {
      if (!newProfile) {
        return res.status(404).json({
          success: false,
          message: `This patient with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `this profile is updated`,
        newProfile: newProfile,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const deletePatient = (req, res) => {
  const id = req.params.id;
  patientModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The doctor with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `doctor canceld`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const veiwProfile = (req, res) => {
  let id = req.params.id;
  patientModel
    .findById(id)

    .then((patient) => {
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: `The patient with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The patient ${id} `,
        patient: patient,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = {
  register,
  login,
  updateprofile,
  deletePatient,
  veiwProfile,
};

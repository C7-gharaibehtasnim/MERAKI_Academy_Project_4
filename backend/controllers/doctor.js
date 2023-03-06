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


const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    console.log(password)
    console.log(email)
    doctorModel
      .findOne({ email })
      .populate("role", "-_id -__v")
      .then(async (result) => {
        console.log(result)
        if (!result) {
           
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        try {
          const valid = await bcrypt.compare(password, result.password);
          console.log(valid)
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The email doesn't exist or The password you’ve entered is incorrect`,
            });
          }
          const payload = {
            userId: result._id,
          
            role: result.role,
          };
  
          const options = {
            expiresIn: "60m",
          };
          console.log( process.env.SECRET)
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
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

const updateprofile=(req,res)=>{
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  doctorModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newProfile) => {
      if (!newProfile) {
        return res.status(404).json({
          success: false,
          message: `This Doctor with id => ${id} not found`,
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
}
  
module.exports = {
  register,login,updateprofile
  
};
const doctorModel = require("../models/doctorSchema");
const bcrypt = require("bcryptjs");
const { genrateToken } = require("../controllers/config");
const jwt = require("jsonwebtoken");
const loginDoctor = (req, res,next) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
   // console.log(password);
   // console.log(email);
    doctorModel
      .findOne({ email })
      .populate("role", "-_id -__v")
      .then(async (result) => {
       // console.log(result);
        if (!result) {
         
          req.body={email,password}
          next();
        }
        try {
          const valid = await bcrypt.compare(password, result.password);
          console.log(valid);
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
          console.log(process.env.SECRET);
          const token=genrateToken(payload,options)
         // const token = jwt.sign(payload, process.env.SECRET, options);
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
  
  module.exports = loginDoctor
const adminModal = require("../models/adminSchema");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const register = (req, res) => {
    const {
        name,email,password,role
    } = req.body;
    const admin = new adminModal({
        name,email,password,role
    });
  
    admin
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
      adminModal
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
              expiresIn: "24h",
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
  
  module.exports = {
    register,login
    
  };
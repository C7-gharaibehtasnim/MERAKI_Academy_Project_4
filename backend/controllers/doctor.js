const doctorModel = require("../models/doctorSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { genrateToken } = require("./config");

const register = (req, res) => {
  const {
    image,
    firstName,
    lastName,
    email,
    password,
    // insurance,
    appointments,
    clinic,
    role,
    pref
  } = req.body;
  const doctor = new doctorModel({
    image,
    firstName,
    lastName,
    email,
    password,
    // insurance,
    appointments,
    clinic,
    role,
    pref
  });
console.log(req.body);
  doctor
    .save()
    .then((result) => {
      doctorModel.findOne({email}).populate("role").exec().then((response)=>{
        console.log("ddd",response)
      const payload = {
        userId: result._id,

     role: response.role,
    
      };
     
      const options = {
        expiresIn: "24h",
      };
      console.log("43",response.role.role)
     const token= genrateToken(payload,options)
     
     res.status(201).json({
       success: true,
       message: `Account Created Successfully`,
      
       role:response.role.role,
       token:token,
      
       id: result._id,
             });
   })
     
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      else{
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    }
    });
};


const updateprofile = (req, res) => {
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
};
const addDoctor = (req, res) => {
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
const deleteDoctor = (req, res) => {
  const id = req.params.id;
  doctorModel
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
        message: `doctor deleted`,
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
const veiwProfile=(req,res)=>{
  let id = req.params.id;
  doctorModel
    .findById(id).populate("clinic").populate("appointments").exec()
  
    .then((doctor) => {
      console.log(doctor)
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: `The doctor with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The doctor ${id} `,
        doctor: doctor,
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
const veiwdoctorsbyclinicid=(req,res)=>{
  const id = req.params.id;
 

  console.log(id);
  doctorModel
    .find({ clinic: id })
    //.populate("doctor","firstName -_id").populate("clinic","sectionname -_id").exec()

    .then((doctor) => {
  console.log(doctor)
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: `you have n`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The appointments ${id} `,
        doctor: doctor,
        
       
      })})
   
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
}
const searchResult =(req,res)=>{
  const search=req.query.search
 ////const searchitem=req.query.searchitem
 doctorModel.find({firstName:{$regex:search}})
 .then((doctor) => {
  console.log(doctor)
  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: `The doctor with id =>  not found`,
    });
  }
  res.status(200).json({
    success: true,
    message: `The doctor  `,
    doctor: doctor,
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
  register,
 veiwdoctorsbyclinicid,
  updateprofile,
  addDoctor,
  deleteDoctor,
  veiwProfile,searchResult
};

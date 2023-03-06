const appointmentModal = require("../models/appointmentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bookAnAppointment = (req, res) => {
const patient=req.token.userId
console.log(patient)
  const {date ,doctor,time} = req.body;

  const appointment = new appointmentModal({ patient, doctor, date, time });
  appointmentModal.findOne({ date,time })
  .then((result1) => {
    if (result1) {
      return res.status(409).json({
        success: false,
        message: `This appointment already booked at this date `,
      });
    } else {
      appointment
        .save()
        .then((result) => {
          res.status(201).json({
            success: true,
            message: `Appointment Booked Successfully`,
            appointment: result,
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
  });
};
//can i make the date unique
/*

 if (err.keyPattern) {
            return res.status(409).json({
              success: false,
              message: `The email already exists`,
            });
          }

*/
module.exports = {
  bookAnAppointment,
};

const appointmentModal = require("../models/appointmentSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bookAnAppointment = (req, res) => {
  const patient = req.token.userId;
  console.log(patient);
  const { date, doctor, time } = req.body;

  const appointment = new appointmentModal({ patient, doctor, date, time });
  appointmentModal.findOne({ date, time,doctor }).then((result1) => {
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
const getAppointmentBypatientID = (req, res) => {
  const id = req.token.userId;

  console.log(req.token.role.role);
  appointmentModal
    .find({ patient: id }).populate("patient").exec()

    .then((appointment) => {
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: `you have n`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The appointments ${id} `,
        appointment: appointment,
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

const getAppointmentBydoctorID = (req, res) => {
  console.log("HIFROM THE FUNCTION")
  const id = req.token.userId;

  console.log(req.token.role.role);
  appointmentModal
    .find({ doctor: id })

    .then((appointment) => {
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: `you dont have appointments yet`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The appointments ${id} `,
        appointment: appointment,
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

const deleteAppoitment = (req, res) => {
  const id = req.params.appointmentid;
  appointmentModal
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The appoitment with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `appoitment canceld`,
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
const UpdateAppoitment=(req,res)=>{
  const id = req.params.appointmentid;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  appointmentModal
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newAppointment) => {
      if (!newAppointment) {
        return res.status(404).json({
          success: false,
          message: `The appointment with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `The appointment updated`,
        newAppointment: newAppointment,
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
  bookAnAppointment,
  getAppointmentBypatientID,
  getAppointmentBydoctorID,
  deleteAppoitment,
  UpdateAppoitment,
};

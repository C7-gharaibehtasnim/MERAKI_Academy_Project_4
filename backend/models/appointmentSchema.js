
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
  date:{type:String,required:true },
  time:{type:String ,required:true},
});

module.exports = mongoose.model("appointments", appointmentSchema);

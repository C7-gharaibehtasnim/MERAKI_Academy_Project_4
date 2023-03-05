
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
 timestamp:true,
 clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "clinic" },
});

module.exports = mongoose.model("appointment", appointmentSchema);

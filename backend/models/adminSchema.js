const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
  role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },

 clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "clinic" },
});

module.exports = mongoose.model("admin", adminSchema);

const mongoose = require("mongoose");
const validator = require("validator");
const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, lowercase: true },
  lastName: { type: String, required: true, trim: true, lowercase: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
   validate(value){if(!validator.isEmail(value)){throw Error("email is not valid")} }
  },
  insurance: { type: String, required: true, trim: true, lowercase: true },
  password: {
    type: String,
    minlength: 8,
    required: true,
    trim: true,
    lowercase: true,
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointments" }],
  role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("patient", patientSchema);
// validate(value){! validator.isEmail(value){throw Error("email is not valid")}}

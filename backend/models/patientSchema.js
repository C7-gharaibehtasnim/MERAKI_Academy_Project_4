const mongoose = require("mongoose");
const validator=require("validator")
const patientSchema = new mongoose.Schema({
  Fname: { type: String, required: true ,trim:true,lowercase:true},
  Lname: { type: String, required: true,trim:true,lowercase:true },
  email:{type:String,required:true,unique:true,trim:true,lowercase:true,
    validate(value){! validator.isEmail(value){throw Error("email is not valid")}}},
insurance:{ type: String, required: true ,trim:true,lowercase:true},
Password:{type:String,minlength:8, required:true,trim:true,lowercase:true,} ,
appointments: { type: mongoose.Schema.Types.ObjectId, ref: "appointments" },

});

module.exports = mongoose.model("patient", patientSchema);

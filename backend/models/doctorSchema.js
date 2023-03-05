
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  Fname: { type: String, required: true ,trim:true,lowercase:true},
  Lname: { type: String, required: true ,trim:true,lowercase:true},
  email:{type:String,required:true,unique:true,trim:true,lowercase:true,
validate(value){! validator.isEmail(value){throw Error("email is not valid")}}},
Password:{type:String,minlength:8, required:true,trim:true,lowercase:true,} ,
appointments: { type: mongoose.Schema.Types.ObjectId, ref: "appointments" },
clinic: { type: mongoose.Schema.Types.ObjectId, ref: "clinic" },
});

module.exports = mongoose.model("doctor", doctorSchema);

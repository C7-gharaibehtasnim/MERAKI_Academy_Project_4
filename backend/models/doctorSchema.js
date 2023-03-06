
const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt = require("bcryptjs");

const doctorSchema = new mongoose.Schema({
  image:{type:String,required: true ,},
  firstName: { type: String, required: true ,trim:true,lowercase:true},
  lastName: { type: String, required: true ,trim:true,lowercase:true},
  email:{type:String,required:true,unique:true,trim:true,lowercase:true,
validate(value){if(! validator.isEmail(value)){throw Error("email is not valid")}}},
password:{type:String,minlength:8, required:true,trim:true} ,
appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appointments" }],
clinic: { type: mongoose.Schema.Types.ObjectId, ref: "clinic" },
role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },

});

doctorSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("doctor", doctorSchema);

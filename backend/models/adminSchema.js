const mongoose = require("mongoose");
const validator=require("validator")
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
   validate(value){if(!validator.isEmail(value)){throw Error("email is not valid")} }
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    trim: true,
   
  },
  role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },

});


adminSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model("admin", adminSchema);

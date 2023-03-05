

const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
sectionname:{type:String,required:true,},
doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "doctor" }],

});

module.exports = mongoose.model("clinic", clinicSchema);

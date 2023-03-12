

const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
sectionname:{type:String,required:true,},
doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "doctor" }],
image:{type:String}
});

module.exports = mongoose.model("clinic", clinicSchema);

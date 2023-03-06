const clinicModal = require("../models/clinicSchema")
const newclinic=(req,res)=>{
 
   const {sectionname,doctor}=req.body
const clinic=new clinicModal({sectionname,doctor})
clinic.save().then((result)=>{
    res.status(202).json({
        success: true,
        message: `Clinic is Added`,
        clinic: clinic,
})
}).catch((err)=>{
    res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
})

})
}
module.exports = {
  
    newclinic
};
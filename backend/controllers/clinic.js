const clinicModal = require("../models/clinicSchema");
const newclinic = (req, res) => {
  const { sectionname, doctor,image } = req.body;
  const clinic = new clinicModal({ sectionname, doctor,image });
  clinic
    .save()
    .then((result) => {
      res.status(202).json({
        success: true,
        message: `Clinic is Added`,
        clinic: clinic,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getAllclinics = (req, res) => {
  clinicModal
    .find({})

    .then((clinic) => {
      if (!clinic) {
        return res.status(404).json({
          success: false,
          message: `you dont have clinic yet`,
        });
      }
      res.status(200).json({
        success: true,
        message: `your clinics `,
        clinic: clinic,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const updateclinic = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key] == "" && delete filter[key];
  });
  clinicModal
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newProfile) => {
      if (!newProfile) {
        return res.status(404).json({
          success: false,
          message: `This Doctor with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `this profile is updated`,
        newProfile: newProfile,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const deleteclinic = (req, res) => {
    const id = req.params.id;
    clinicModal
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            success: false,
            message: `This clinic with id => ${id} not found`,
          });
        }
        res.status(200).json({
          success: true,
          message: `clinic deleted`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });


};
module.exports = {
  newclinic,
  getAllclinics,
  updateclinic,
  deleteclinic,
};

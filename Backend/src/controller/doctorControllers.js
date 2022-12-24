// const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const mongoose = require('mongoose');

const handleError = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "Invalid Doctor Id") {
    errors.doctorId = "Doctor is not registered";
  }
  return errors;
};
// module.exports.search_patient = async (req, res) => {
//   const healthID = req.params.healthID;
//   try {
//     const patient = await Patient.findOne({ healthID });
//     res.status(200).json({ patient });
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong..." });
//   }
// };

module.exports.get_doctor = async (req, res) => {
  const data = await Doctor.find();
  res.status(200).json({data});
};

module.exports.getDoctorById = async(req, res) => {
  const { id } = req.params;
  
  try {
    if( !mongoose.Types.ObjectId.isValid(id) ) 
      throw Error("Invalid Doctor Id");

    const data = await Doctor.find({_id: id});
    
    if(data){
      res.status(200).json({data});
    }
    else{
      throw Error("Invalid Doctor Id");
    }

  } catch (err) {
    const error = handleError(err);
    res.json({error});
  }
}

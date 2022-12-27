// register and login routes for the patient

const { Router } = require("express");
const {
  patient_register,
  patient_login,
  getPatientById,
  getPatient,
} = require("../controller/registerControllers");

const router = Router();

router.post("/register/patient", patient_register);
router.post("/login/patient", patient_login);
router.get("/patient/:id/id", getPatientById)
router.get("/patient/all", getPatient)

module.exports = router;

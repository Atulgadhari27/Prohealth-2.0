const { Router } = require("express");
const router = Router();
const {doctor_login, doctor_register } = require("../controller/doctorAuthControllers");
const { get_doctor, getDoctorById } = require("../controller/doctorControllers");
// const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");

router.post("/register/doctor", doctor_register);
router.post("/login/doctor", doctor_login);
router.get("/doctor/all", get_doctor);
router.get("/doctor/:id/id", getDoctorById);

module.exports = router;
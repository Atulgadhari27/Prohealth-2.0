const express = require("express");
const { getAllDoctors, registerDoctor, getDoctorById} = require("../controller/doctor.controller");
const router = express.Router();

router.get("/", getAllDoctors);
router.post("/register", registerDoctor);
router.get("/:id/id", getDoctorById);
module.exports = router;
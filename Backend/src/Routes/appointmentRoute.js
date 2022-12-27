const { Router } = require("express");
const { bookAppointment, getAllBookings, getUserBookings, updateBookingStatus, getDoctorBookings} = require("../controller/appointmentController");

const router = Router();

router.post("/booking/book", bookAppointment);
router.get("/booking/all", getAllBookings);
router.get("/booking/:id/userBookings", getUserBookings);
router.get("/booking/:id/doctorBookings", getDoctorBookings);
router.post("/booking/updateStatus", updateBookingStatus);

module.exports = router;
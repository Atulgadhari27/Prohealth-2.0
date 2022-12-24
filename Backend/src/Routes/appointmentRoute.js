const { Router } = require("express");
const { bookAppointment, getAllBookings, getUserBookings, updateBookingStatus } = require("../controller/appointmentController");

const router = Router();

router.post("/booking/book", bookAppointment);
router.get("/booking/:id/allBookings", getAllBookings);
router.get("/booking/:id/userBookings", getUserBookings);
router.post("/booking/updateStatus", updateBookingStatus);

module.exports = router;
const express = require("express");
const { bookAppointment, getAllBookings, getUserBookings, updateBookingStatus} = require("../controller/booking.controller");
const router = express.Router();

router.post("/book", bookAppointment);
router.get("/:id/allbookings", getAllBookings);
router.get("/:id/userBookings", getUserBookings)
router.post("/updateStatus", updateBookingStatus);
module.exports = router;
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    doctor_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "doctors",
        required : true
    },
    name : String,
    contact : String,
    time : String,
    status:Boolean,
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required : true
    }
});

const Bookings = mongoose.model("booking", bookingSchema)

module.exports = Bookings
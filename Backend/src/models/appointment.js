const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    doctor_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "doctor",
        required : true
    },
    name : String,
    contact : String,
    time : String,
    status:Boolean,
    patient_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
        required : true
    },
});

const Appointments = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointments
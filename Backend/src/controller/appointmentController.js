const Appointment = require('../models/appointment');


const handleError = (err) => {
    let errors = {};
  
    // incorrect email
    if (err.message === "Error Occurred") {
      errors.doctorId = "Unable to Book";
    }
    return errors;
  };

module.exports.bookAppointment = async (req, res) => {
    const {doctor_id, name, contact, status, time, patient_id} = req.body;
    try {
        const book = await Appointment.create({
            doctor_id: doctor_id,
            name: name,
            contact: contact,
            time: time,
            status: true,
            patient_id: patient_id
        })

        if(book){
            res.status(201).json({
                _id: book._id,
                doctor_id: book.doctor_id,
                name: book.name,
                contact: book.contact,
                time: book.time,
                status: book.status,
                patient_id: book.patient_id
            })
        }
        else{
            res.status(400);
            throw new Error("Error Occurred");
        }
    } catch (err) {
        const error = handleError(err);
        res.json({error: err.message});
    }
}

module.exports.getAllBookings = async (req, res) => {
    const {id} = req.params;

    const data = await Appointment.find({
        doctor_id: id
    });
    res.status(201).json({data});
}

module.exports.getUserBookings = async (req, res) => {
    const {id} = req.params;

    const data = await Appointment.find({
        patient_id: id
    });
    res.status(200).json({data});
}

module.exports.updateBookingStatus = async (req, res) => {
    const {id} = req.body;

    const book = await Appointment.findOneAndUpdate(
        {_id : id},
        {status: false},
        {new: true},
    );

    if(book){
        res.status(201)
    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }
}

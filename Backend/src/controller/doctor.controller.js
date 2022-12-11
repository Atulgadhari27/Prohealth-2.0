const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctors.model");

const getAllDoctors = async (req, res) => {
    const allData = await Doctor.find();
    // console.log(typeof(allData));
    res.send(allData);
}

const getDoctorById = async(req, res) => {
    const {id} = req.params;
    const doctor = await Doctor.find({
        _id : id
    })
    res.status(200).json({doctor})
}

const registerDoctor = async( req, res) => {
    console.log(req.body);
    const {name, specialization, experience, area, clinic_name, consulting_fee, city, id,likes, description} = req.body;
    
    const doctor = await Doctor.create({
        name,
        specialization,
        experience,
        area,
        clinic_name,
        consulting_fee,
        city,
        id,
        likes,
        description
    });

    if(doctor){
        res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            specialization: doctor.specialization,
            experience: doctor.experience,
            area: doctor.area,
            clinic_name: doctor.clinic_name,
            consulting_fee: doctor.consulting_fee,
            city: doctor.city,
            id: doctor.id,
            likes: doctor.likes,
            description: doctor.description,
        })
    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }
}

module.exports = {getAllDoctors, registerDoctor, getDoctorById}
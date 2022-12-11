
const express = require("express");
const router = express.Router();

const Bookings = require("../models/Bookings.model")

const bookAppointment = async (req, res) => {
    const {doctor_id, name, contact, status, time, user_id} = req.body;

    const book = await Bookings.create({
        doctor_id: doctor_id,
        name: name,
        contact: contact,
        time: time,
        status: true,
        user_id: user_id
    })

    if(book){
        res.status(201).json({
            _id: book._id,
            doctor_id: book.doctor_id,
            name: book.name,
            contact: book.contact,
            time: book.time,
            status: book.status,
            user_id: book.user_id
        })
    }
    else{
        res.status(400);
        throw new Error("Error Occurred");
    }
}


const getAllBookings = async (req, res) => {
    const {id} = req.params;

    const data = await Bookings.find({
        doctor_id: id
    });
    res.status(201).json({data});
}

const getUserBookings = async (req, res) => {
    const {id} = req.params;

    const data = await Bookings.find({
        user_id: id
    });
    res.status(201).json({data});
}

const updateBookingStatus = async (req, res) => {
    const {id} = req.body;

    const book = await Bookings.findOneAndUpdate(
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

module.exports = { bookAppointment, getAllBookings, getUserBookings, updateBookingStatus}
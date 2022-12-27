
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

module.exports.sendEmail = (req, res) => {
    let {email, time, patientName, doctorName, status} = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth:{
            user:'atulgadhari4@gmail.com',
            pass:'sofhbkepznpljugc'
        }
    })

    let mailOptions = {
        from: 'atulgadhari4@gmail.com',
        to: email,
        subject: "Appointment Booked",
        html: `
        <h3>Patient Name: ${patientName}</h3>
        <h3>Doctor Name: ${doctorName}</h3>
        <h3>Time: ${time}</h3>
        `
    };
    if(status === false){
        mailOptions = {
            from: 'atulgadhari4@gmail.com',
            to: email,
            subject: "Appointment Cancelled",
            html: `
            <h3>Patient Name: ${patientName}</h3>
            <h3>Doctor Name: ${doctorName}</h3>
            <h3>Time: ${time}</h3>
            `
        }
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if(error){
            res.send(error.message);
        }
        else{
            res.send("Success");
        }
    })
}
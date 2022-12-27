const express = require("express")
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require("mongoose");
dotenv.config()


const registerRoutes = require('./Routes/registerRoute')
const doctorRoute = require("./Routes/doctorRoute")
const appointmentRoute = require("./Routes/appointmentRoute");
const prescriptionRoute = require("./Routes/prescriptionRouter")
// const bookingRoutes = require("./Routes/bookingRoutes")


const app = express()
app.use(express.json())
app.use(cors())

const dbURI = process.env.URI;
const port = process.env.PORT || 5000;

mongoose
  .connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
  })
  .then((result) => {
    app.listen(port);
    console.log("connected to db and listening at port 5000");
    app.get("/", (req, res) => {
        res.send("<h1> Hii I am from Backend</h1>");
    })
  })
  .catch((err) => {
    app.listen(port);
    app.get("/", (req, res) => {
      res.send(
        "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
      );
    });
  });

app.use(registerRoutes)
app.use(doctorRoute)
app.use(appointmentRoute);
app.use(prescriptionRoute);
// app.use("/booking", bookingRoutes);
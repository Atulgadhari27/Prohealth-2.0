const express = require("express")
const connect = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


const userRoutes = require('./Routes/userRoutes')
const doctorRoutes = require("./Routes/doctorRoutes")
const bookingRoutes = require("./Routes/bookingRoutes")


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1> Hii I am from Backend</h1>");
})

app.use("/auth", userRoutes)
app.use("/doctors", doctorRoutes)
app.use("/booking", bookingRoutes);

const port = process.env.PORT || 5000
const start = async() => {
    await connect();
    app.listen(port, () => {
        console.log(`Listening to port ${port}`)
    })
}

module.exports = start
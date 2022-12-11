const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const URI = process.env.URI;

const connect = () => {
    return mongoose.connect(URI, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }).then(() => {
        console.log("connection established")
    }).catch(err => console.log(err))
}

module.exports = connect;

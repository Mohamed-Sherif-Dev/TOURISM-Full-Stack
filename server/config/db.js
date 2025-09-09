const mongoose = require('mongoose');
const Mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined in .env file");
}

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGO DB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.error("MONGO DB CONNECTION FAILED", error);
        process.exit(1);
        
    }
}


module.exports = connectDB;
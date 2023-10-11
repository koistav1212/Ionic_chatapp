import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;



const Connection =async ()=>{
    const URL = `mongodb://localhost:27017`
    try {
       await mongoose.connect(URL, { useUnifiedTopology: true })
       console.log("database connected sucessfully");
    } catch (error) {
        console.log("error in connecting database",error.message);
    }
}

export default Connection;

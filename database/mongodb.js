import mongoose from "mongoose";
import { DB_URI,Node_ENV } from "../config/env.js"; 
if(!DB_URI){
    throw new Error("please define the mongoose-uri in the .env.developement.local file")
}
const connctTODatabase = async()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`the database is running at the ${Node_ENV} environment`);
        
    }
    catch(error){
        console.error("error whileconnectiong to the database",error);
         
        process.exit(1);
    }
}

export default connctTODatabase;
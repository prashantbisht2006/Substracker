import express from "express";
import userRoute from "./routes/user.route.js";
import  authRouter  from "./routes/auth.route.js";
import subscription from "./routes/subscription.route.js";
import { PORT } from './config/env.js';
import connctTODatabase from "./database/mongodb.js";
import errormiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetmiddleware from "./middleware/arcjet.middleware.js";
const app = express();
app.get("/",(req,res)=>{
    res.send("hey! welcome to the prshants web page .")
});
app.use(express.json());// handel the json data send in request
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/subs",subscription);
app.use(errormiddleware);
app.use(arcjetmiddleware);

app.listen(PORT,async()=>{
    console.log(`server is running fine in the host ${PORT}`);

    await connctTODatabase();
    
});
export default app;

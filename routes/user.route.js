import { Router, urlencoded } from "express";
const userRoute = Router();
import { getuser,getusers } from "../controlers/user.controler.js";
import authorize from "../middleware/auth.middleware.js";

// get the user 

userRoute.get("/",getusers);

userRoute.get("/:id",authorize,getuser);

userRoute.post("/",(req,res)=>{
    res.send({ title:"post new user"})
});

userRoute.put("/:id",(req,res)=>{
    res.send({title:"update the given user"})
});

userRoute.delete("/:id",(req,res)=>{
    res.send({ title:"delete the given user detail"})
})

export default userRoute;

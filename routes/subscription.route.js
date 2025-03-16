import { Router } from "express";
import authorize from '../middleware/arcjet.middleware.js';
import createsubscription from '../controlers/subscription.controler.js'

const subscription = Router();

subscription.get("/",(req,res)=>{res.send({title:"give me the all subscritions"})});

subscription.get("/:id",(res,req)=>{res.send({title:"det the subscription details"})});

subscription.post("/",authorize,createsubscription);

subscription.put("/:id",(req,res)=>{res.send({title:"edit the subscription"})});

subscription.delete("/:id",(req,res)=>{res.send({title:"delete the data "})})

export default subscription;
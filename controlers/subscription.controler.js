
import Subscription from "../models/subscription.model.js";

const createsubscription = async(req,res,next)=>{
    try{
        const subscriptions = await Subscription.create({
            ...req.body,
            user: req.user._id,


        });
        res.status(201).json({success:true, data: subscriptions })

    }catch(error){
        next(error);

    }
}
export default createsubscription;
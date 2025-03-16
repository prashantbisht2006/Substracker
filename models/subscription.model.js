import mongoose from "mongoose";
const subsPlan = new mongoose.Schema({
    name:{type:String,required:true,minLength3,trim:true},
    price:{type:Number,required:true,min:[0,"price must be more the 0"]},
    currency:{type:String,enum:["INR","USD","YEN"],default:"INR"},
    frequecy:{type:String,enum:["daily","monthly","quaterly","yearly"]},
    paymentMethod:{type:String,required:true,trim:true},
    status:{type:String,enum:["active","failed","expired"]},
    startDate:{type:Date,required:true,
        validate:{
            validation : (value)=>{value<=new Date},
            message:"start due date must be in past"
        }
    },
    renewalDate:{type:Date,
        
        validation:{
            validator: (value)=>{
                return value > this.startDate;                 /// validator function
            },
            message:"Renewal date must be in future"

        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,index:true

    }
},{timestamps:true});


// auto rewable date calculator this helps to calculate the reneewable date if it s not provided by user
subsPlan.pre('save',(next)=>{
    if(!this.renewalDate){
        const reneawalperiod ={
            daily : 1,
            weekly: 7,
            monthly: 28,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.startDate(this.renewalDate.getDate()+ new reneawalperiod[this.frequecy]);
    }
    // auto update the status if renwal date is passed

    if (this.renewalDate< new Date()){
        this.status = "expired";
    }
    next();
})

const subscription = mongoose.model('subplan',subsPlan);
export default subscription;

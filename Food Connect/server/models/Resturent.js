const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const Resturent=new mongoose.Schema({
    Organization_Name:{
        type:String,
        required:true,
    },
    Organization_Type:{
        type:String,
        required:true,
    },
    Organization_Address:{
        type:String,
        required:true,
    },
    Organization_Contact:{
        type:Number,
        required:true,
    },
    Organization_Email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    Organization_Website:{
        type:String,
    },
    GST_Number:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        default:'resturant'
    }
});
Resturent.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(user.password,salt);
        user.password=hashPassword;
        next();
    }catch(err){
        return next(err);
    }
})

Resturent.methods.comparePassword=async function(password){
    try{
        const ismatch=await bcrypt.compare(password,this.password);
        return ismatch;
    }catch(err){
        res.status(500).json({error:"internal server error"});
    }
}

const ResturentModel=mongoose.model('Resturent',Resturent);
module.exports=ResturentModel;
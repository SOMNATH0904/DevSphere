const mongoose=require('mongoose');
const Indiviual=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    Contact:{
        type:Number,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    AadharNumber:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        default:'individual'
    }
});

const IndiviualModel=mongoose.model('Indiviual',Indiviual);
module.exports=IndiviualModel;
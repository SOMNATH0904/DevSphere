const mongoose=require('mongoose');
const NGO=new mongoose.Schema({
    Organization_Name:{
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
        default:'NGO'
    }
});

const NGOModel=mongoose.model('NGO',NGO);
module.exports=NGOModel;
const mongoose=require('mongoose');
const Request=new mongoose.Schema({
    Item_names:{
        type:String,
        required:true,
    },
    Item_quantity:{
        type:Number,
        required:true,
    },
    requester_name:{
        type:String,
        required:true
    },
    requester_email:{
        type:String,
        required:true
    },
    requester_phone:{
        type:String,
        required:true
    }
});
const RequestModel=mongoose.model('Request',Request);
module.exports=RequestModel;
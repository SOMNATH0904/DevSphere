const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to mongodb');
});
db.on('error',(err)=>{
    console.log('connection error');
});
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
});
module.exports=db;
const express=require('express');
const route=express.Router();
const User=require('./../models/Indiviual');
const {jwtAuthMiddleware,generateToken}=require('../jwt')
route.post('/signup',async(req,res)=>{
    try{        
        const data=req.body
        const existingUser = await User.findOne({ Email: data.Email});
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same email already exists' });
        }
        const newUser=new User(data);
        const response=await newUser.save()
        console.log("data saved")
        const payload={
            id:response.id,
            Email:response.Email
        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload);
        console.log("Token is :", token);
        res.status(200).json({response:response,token:token})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"data not saved"})
    }
  })
route.post('/login',async(req,res)=>{
    try{
        const {Email,password}=req.body;
        if(!Email||!password){
            return res.status(400).json({error:'username and password are required' });
        }
        const user=await User.findOne({Email:Email})
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:"invalid data"})
        }
        const payload={
            id:user.id,
            Email:user.Email
        }
        const token=generateToken(payload)
        res.json(token);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }       
})


route.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userId=req.user.id;
        const {currentPassword,newPassword}=req.body;
        if (!currentPassword||!newPassword) {
            return res.status(400).json({error:'Both currentPassword and newPassword are required' });
        }
        const user=await User.findById(userId);
        if(!user||!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error:"invalid data"})
        }
        user.password=newPassword;
        user.save();
        console.log("password updated");
        res.status(200).json({message:"password updated"});
    }catch(err){
        console.log(err)
        res.status(500).json({err:"internal server error"})
    }
})
route.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user
        const userId=userData.id
        const user=await User.findById(userId)
        res.status(200).json({user})
    }catch(err){
        console.log(err);
        res.status(500).json({ err: "internal server error" });
    }

})
route.post('/logout',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(req.headers&&req.headers.authorization){
            const token=req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({success:false,message:'Authorization failed!'});
            }
            const tokens=req.user.tokens||[];
            const newTokens=tokens.filter(t=>t.token!==token);
            await User.findByIdAndUpdate(req.user._id,{tokens:newTokens});
            return res.json({success:true,message:'Sign out successfully!'});
        }else{
            return res.status(400).json({success:false,message:'No authorization header provided!'});
        }
    }catch(err){
        console.error("Error in logout:",err);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});
module.exports=route;
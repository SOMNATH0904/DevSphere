const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");
const passport = require("passport");
router.post("/register", async (req, res) => {
    const {Name, Address, Contact, Email, password,AadharNumber,role} = req.body;
    const user = await User.findOne({Email: Email});
    if (user) {
        return res
            .status(403)
            .json({error: "A user with this email already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
        Name,
        Address,
        Contact,
        Email,
        password: hashedPassword,
        AadharNumber,
        role
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);
    const token = await getToken(Email, newUser);
    const userToReturn = {...newUser.toJSON(), token};
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    const {Email,password}=req.body;
    const user=await User.findOne({Email:Email});
    if(!user){
        return res.status(403).json({err: "Invalid credentials"});
    }
    console.log(user);
    const isPasswordValid=await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({err: "Invalid credentials"});
    }
    const token=await getToken(user.email, user);
    const userToReturn={...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});
router.get("/profile", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const user = req.user;
    console.log("user", user);
    return res.status(200).json(user);
});
module.exports = router;
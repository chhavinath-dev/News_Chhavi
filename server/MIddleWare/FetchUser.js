const User = require("../Models/UserSchema");
const jwt = require('jsonwebtoken');
const secretKeyPass = "#poe067ahbdhabdhag6bsheNewsAPPWEbAPP";
const FetchUser= async (req,res,next)=>{
    const token= req.header("Token");
    if(!token){
      return  res.status(401).json({ errors:"please provide a valid authetication token" });
    }
    try {
        
        const user= await User.findOne({_id: req.params.id}, { name: 1, following:1, followers:1, profilePhoto:1 })
        req.user= user;
    } catch (error) {
        return  res.status(401).json({ errors:"Internal Server Error" });
    }
next();
}
module.exports= FetchUser
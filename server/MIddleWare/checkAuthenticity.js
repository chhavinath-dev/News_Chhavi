
const User = require("../Models/UserSchema");
const jwt = require('jsonwebtoken');
const secretKeyPass = "#poe067ahbdhabdhag6bsheNewsAPPWEbAPP";
const checkAuthenticity= async (req,res,next)=>{
    const token= req.header("Token");
    if(!token){
      return  res.status(401).json({ errors:"please provide a valid authetication token" });
    }
    try {
        const Userid=  jwt.verify(token, secretKeyPass);
        if(req.params.id!==Userid.id){
            return  res.status(404).json({ errors:"Unauthorized" });
        }
    } catch (error) {
        return  res.status(401).json({ errors:"Internal Server Error" });
    }
next();
}
module.exports= checkAuthenticity


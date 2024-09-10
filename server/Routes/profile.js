const express = require("express");
const router = express.Router();
const FetchUser = require("../MIddleWare/FetchUser");
const News= require('../Models/NewsSchema')
const User = require("../Models/UserSchema");
const checkAuthenticity = require("../MIddleWare/checkAuthenticity");
const bcrypt = require("bcrypt");
router.get('/ConnectionInfo/:id', async(req, res)=>{
  try {
    const user= await User.findOne({_id: req.params.id}, {_id:0, name: 1, profilePhoto:1 })
    res.status(200).json(user)
  }catch(err){
     res.status(500).json("Internal Server Error")
  }
})
router.get('/UserInfo/:id', async(req, res)=>{
  try {
    const user= await User.findOne({_id: req.params.id}, {_id:0, name:1, email:1, Gender:1, DOB:1})
    res.status(200).json(user)
  }catch(err){
     res.status(500).json("Internal Server Error")
  }
})
router.get("/Userprofile/:id", FetchUser, async (req, res) => {
  try{
   const news= await News.find({user: req.user._id}).sort({date:-1})

   res.status(200).json({following:req.user.following, followers: req.user.followers, news, profilePhoto: req.user.profilePhoto, name : req.user.name , userid: req.user._id})
   return
  }catch(err){
    res.status(500).json({ errors: "Internal Server Error" });
  }

  res.send(req.user)
});
router.put("/UpdateUser/:id", checkAuthenticity, async (req, res) => {
  if(req.body.Old_Password){
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ errors: "User Not Found" });
      return;
    }
    const check = await bcrypt.compare(req.body.Old_Password, user.password);
    if (!check) {
      res.status(404).json({ errors: "Please Provide Correct Password" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const secPas = await bcrypt.hash(req.body.New_Password,salt);
    const getUser = await User.findByIdAndUpdate(
      req.params.id,
         { $set: {password:secPas} },
        { new: true }
      );
      res.status(200);

  }
  
  const DataToUpdate = req.body;
  if(DataToUpdate.email){
    const user = await User.findOne({ email: DataToUpdate.email });
    if (user._id.toString()!==req.params.id) {
      res.status(400).json({ errors: "User already exist with email" });
      return;
    }
  }
  try{
  const getUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { ...DataToUpdate } },
    { new: true }
  );
  res.status(200).json(getUser);
}catch(err){
  res.status(500).json({ errors: "Internal Server Error" });
}
});

router.put("/follows", async (req, res) => {
  
try{ 
   const updatedUser= await User.findByIdAndUpdate(
    { _id: req.body.userid }, 
    { $push: { followers: req.body.id } },
    {new:true}
  );
  await User.findByIdAndUpdate(
    { _id:  req.body.id }, 
    { $push: {following:req.body.userid } } 
  );
  
  res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json({ errors: "Internal Server Error" });
  }
  
});
router.delete("/deleteUser/:id", async (req, res) => {
  
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("Not Found");
    }
    
    user = await User.findByIdAndDelete(req.params.id);
    console.log(user)
    res.status(200).json({ sucess: "audio deleted" });
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
  });

router.put("/unfollows", async (req, res) => {
try{ 
   const updatedUser= await User.findByIdAndUpdate(
    { _id: req.body.userid }, 
    { $pull: { followers: req.body.id } },
    {new:true}
  );
  await User.findByIdAndUpdate(
    { _id:  req.body.id }, 
    { $pull: {following:req.body.userid } } 
  );
  res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json({ errors: "Internal Server Error" });
  }
  
});

module.exports = router;

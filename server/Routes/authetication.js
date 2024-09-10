const express = require("express");
const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const secretKeyPass = "#poe067ahbdhabdhag6bsheNewsAPPWEbAPP";
router.post("/createUser", async (req, res) => {
  const { name, profilePhoto, email, password, Gender, DOB } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const secPas = await bcrypt.hash(password, salt);
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({ errors: "User already exist with email" });
      return;
    }
    const newUser = await new User({
      name,
      email,
      profilePhoto,
      password: secPas,
      Gender,
      DOB,
    });
    const SaveUser = await newUser.save();

    const Auth_Token = jwt.sign({ id: SaveUser._id }, secretKeyPass);
    res.status(200).json({ data: SaveUser, Token: Auth_Token });
  } catch (err) {
    console.error("errror", err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ errors: "Email Not Found" });
      return;
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      res.status(404).json({ errors: "Incorrect Password" });
      return;
    }
    const Auth_Token = jwt.sign({ id: user._id }, secretKeyPass);
    res.status(200).json({ data: user, Token: Auth_Token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: "Internal Server Error" });
  }
});
router.get("/allUser", async (req, res) => {
  const allUser = await User.find();
  res.json(allUser);
});

module.exports = router;

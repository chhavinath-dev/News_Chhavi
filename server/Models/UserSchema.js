const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  profilePhoto: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  view: {
    type: Number,
    default: 0,
  },
  Gender: {
    type: String,
    require: true,
  },
  DOB: {
    type: Date,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("user", userSchema);

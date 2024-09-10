const mongoose = require("mongoose");
const url =process.env.MONGO_ATLAS_URL;
const connectToDB = async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is connected to mongoDB Atlas");
    await mongoose.connect(url);
  }
};
module.exports = connectToDB;

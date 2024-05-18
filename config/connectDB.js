const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    console.log("error in Connecting Database");
    process.end(1);
  }
};

module.exports = connectDB;

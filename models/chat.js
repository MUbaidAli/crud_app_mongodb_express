const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  from: { type: String },
  to: { type: String },
  msg: { type: String, minLength: [1, "can't send Empty Message"] },
  date: { type: Date },
});

const Chat = mongoose.model("Chat", userSchema);

module.exports = Chat;

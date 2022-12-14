const mongoose = require("mongoose");

const User = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  phno:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("users", User);
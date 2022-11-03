const mongoose = require("mongoose");

const Record = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  dor: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("records", Record);

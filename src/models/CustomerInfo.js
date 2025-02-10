const mongoose = require("mongoose");

const customerInfoSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide and email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  pNumber: {
    type: String,
    required: [true, "Please enter a valid phone number"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: 6,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Model create karna
const CustomerInfo = mongoose.model("CustomerInfo", customerInfoSchema);

module.exports = CustomerInfo;

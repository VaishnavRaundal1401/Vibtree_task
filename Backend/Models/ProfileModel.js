const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  emailId: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [2, "Password must be at least 2 characters long"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Date of Birth is required"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number already in use"],
    match: [
      /^[0-9]{10}$/,
      "Invalid mobile number format. It should be a 10-digit number",
    ],
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

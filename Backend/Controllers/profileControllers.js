
// Importing Models
const Profile = require("../Models/ProfileModel");

exports.registerProfile = async (req, res) => {
  try {
    const { name, emailId, password, dateOfBirth, mobileNumber } = req.body;

    // Check if all fields are provided
    if (!name || !emailId || !password || !dateOfBirth || !mobileNumber) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "All fields are required",
      });
    }

    // Create a new profile instance
    const newProfile = new Profile({
      name,
      emailId,
      password, 
      dateOfBirth,
      mobileNumber,
    });

    // Save the new profile to the database
    const savedProfile = await newProfile.save();

    // Return success message
    return res.status(201).json({
      status: "success",
      data: {
        profile: savedProfile,
      },
      message: "Profile registered successfully",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    // Retrieve all profiles from the database
    const profiles = await Profile.find();

    // Check if there are no profiles
    if (profiles.length === 0) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "No profiles found",
      });
    }

    // Return the list of profiles
    return res.status(200).json({
      status: "success",
      data: {
        profiles,
      },
      message: "Profiles retrieved successfully",
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};
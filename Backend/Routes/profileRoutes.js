const express = require("express");
// Importing Models
const Profile = require("../Models/ProfileModel");

// Router Import
const router = express.Router();

// Import Controllers
const {
    registerProfile,
    getAllProfiles
} = require("../Controllers/profileControllers.js");

//Register Profile
router.post("/", registerProfile);

router.get("/",getAllProfiles)

module.exports = router;
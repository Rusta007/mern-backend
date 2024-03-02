// src/routes/profile.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/profile", async (req, res) => {
  try {
    const { email, firstName, age, mobileNo, dob, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).send("User not found");
    }
    existingUser.firstName = firstName;
    existingUser.age = age;
    existingUser.mobileNo = mobileNo;
    existingUser.dob = dob;
    existingUser.gender = gender;
    await existingUser.save();

    console.log(existingUser);
    res.status(200).send("Profile updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating profile");
  }
});

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user details");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    // console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;

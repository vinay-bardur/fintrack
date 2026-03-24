require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, firstName, lastName, displayName, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      firstName,
      lastName,
      displayName,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ accessToken: accessToken, email: user.email });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Verify route
router.get("/verify", (req, res) => {
  // Get token value to the json body
  const token = req.body.accessToken;

  // If the token is present
  if (token) {
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    //  Return response with decode data
    res.json({
      login: true,
      data: decode,
    });
  } else {
    // Return response with error
    res.json({
      login: false,
      data: "error",
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");
const authenticateToken = require("../../middleware/auth");

// @route   GET /user/:email
// @desc    Get user by email
router.get("/:email", authenticateToken, async (req, res) => {
  await User.findOne({ email: req.params.email })
    .then((user) =>
      res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
      })
    )
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;

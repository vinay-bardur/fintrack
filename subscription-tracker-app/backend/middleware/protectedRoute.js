const express = require("express");
const router = express.Router();
const checkAuth = require("./auth");

// A protected route is define here
router.get("/profile", checkAuth, (req, res) => {
  // Access user data through req.userData
  res.json({ message: "You are authenticated" });
});

module.exports = router;

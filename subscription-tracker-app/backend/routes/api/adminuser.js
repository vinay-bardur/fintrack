const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");

// @route   GET admin/user
// @desc    Get all registered users
router.get("/", async (req, res) => {
  await User.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   DELETE admin/user/:id
// @desc    Delete registered user by id
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Item deleted successfully" }))
    .catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;

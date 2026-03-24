const express = require("express");
const router = express.Router();

const checkAuth = require("../../middleware/auth");

// Load FreeTrial model
const FreeTrial = require("../../models/FreeTrial");

// @route   GET api/subscription/freetrial
// @desc    Get all free trial subscriptions
router.get("/", checkAuth, async (req, res) => {
  await FreeTrial.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   POST api/subscription/freetrial
// @desc    Add new free trial subscription
router.post("/", checkAuth, async (req, res) => {
  const newItem = new FreeTrial(req.body);
  await newItem
    .save()
    .then(() => res.json(newItem))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   PUT api/subscription/freetrial/:id
// @desc    Update an existing free trial subscription by id
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const updatedItem = await FreeTrial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// @route   DELETE api/subscription/freetrial/:id
// @desc    Delete a free trial subscription by id
router.delete("/:id", checkAuth, async (req, res) => {
  await FreeTrial.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Item deleted successfully" }))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   Get api/subscription/freetrial/next-ending
// @desc    Get all ending free trial subscriptions by the next x (default:7) days
router.get("/next-ending", checkAuth, async (req, res) => {
  try {
    // Get the number of days from query parameters or use 7 as the default
    const days = parseInt(req.query.days, 10) || 7;

    // if (isNaN(days) || days <= 0) {
    //   return res
    //     .status(400)
    //     .send({ error: "Invalid number of days specified" });
    // }

    const today = new Date();

    const maxRange = new Date();
    maxRange.setDate(today.getDate() + days);

    const endingSoonItems = await FreeTrial.find({
      endDate: { $gte: today, $lte: maxRange },
    });

    res.json(endingSoonItems);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;

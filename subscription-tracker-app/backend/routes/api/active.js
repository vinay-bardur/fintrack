const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middleware/auth");

// Load Active model
const Active = require("../../models/Active");

// @route   GET api/subscription/active
// @desc    Get all active subscriptions
router.get("/", authenticateToken, async (req, res) => {
  await Active.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   POST api/subscription/active
// @desc    Add new subscription
router.post("/", authenticateToken, async (req, res) => {
  const newItem = new Active(req.body);
  await newItem
    .save()
    .then(() => res.json(newItem))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   PUT api/subscription/active/:id
// @desc    Update an existing subscription by id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedItem = await Active.findByIdAndUpdate(
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

// @route   DELETE api/subscription/active/:id
// @desc    Delete a subscription by id
router.delete("/:id", authenticateToken, async (req, res) => {
  await Active.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Item deleted successfully" }))
    .catch((err) => res.status(400).json({ error: err }));
});

// @route   GET api/subscription/active/yearly-estimated-cost
// @desc    Get yearly estimated cost for all active subscriptions
router.get("/yearly-estimated-cost", authenticateToken, async (req, res) => {
  try {
    const total = await Active.aggregate([
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$type", "D"] },
                    then: { $multiply: ["$price", 365] },
                  },
                  {
                    case: { $eq: ["$type", "W"] },
                    then: { $multiply: ["$price", 52] },
                  },
                  {
                    case: { $eq: ["$type", "M"] },
                    then: { $multiply: ["$price", 12] },
                  },
                ],
                default: "$price",
              },
            },
          },
        },
      },
    ]);
    res.json(total);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// @route   GET api/subscription/active/monthly-estimated-cost
// @desc    Get monthly estimated cost for all active subscriptions
router.get("/monthly-estimated-cost", authenticateToken, async (req, res) => {
  try {
    const total = await Active.aggregate([
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: {
              $switch: {
                branches: [
                  {
                    case: { $eq: ["$type", "D"] },
                    then: { $multiply: ["$price", 30] },
                  },
                  {
                    case: { $eq: ["$type", "W"] },
                    then: { $multiply: ["$price", 4.33] },
                  },
                  {
                    case: { $eq: ["$type", "Y"] },
                    then: { $divide: ["$price", 12] },
                  },
                ],
                default: "$price",
              },
            },
          },
        },
      },
    ]);
    res.json(total);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// @route   Get api/subscription/active/next-payment
// @desc    Get all upcoming to be paid active subscriptions by the next x (default:7) days
router.get("/next-payment", authenticateToken, async (req, res) => {
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

    const nextPaymentItems = await Active.find({
      nextDate: { $gte: today, $lte: maxRange },
    });

    res.json(nextPaymentItems);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;

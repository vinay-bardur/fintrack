const mongoose = require("mongoose");

const activeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["D", "W", "M", "Y"],
    required: true,
  },
  price: {
    type: mongoose.Decimal128,
    required: true,
  },
  nextDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Active", activeSchema);

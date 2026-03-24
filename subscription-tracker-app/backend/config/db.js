require("dotenv").config();

const mongoose = require("mongoose");

const db = `mongodb+srv://sjoyee:${process.env.DB_PASSWORD}@cluster0.dqysirs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

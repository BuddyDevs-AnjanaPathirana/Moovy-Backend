require("dotenv").config();
const winston = require("winston");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", false);
  const db = process.env.DB_TEST;
  mongoose
    .connect(db)
    .then(() => console.log(`Connected to ${process.env.DB_TEST}...`));
};

const winston = require("winston");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1/moovy")
    .then(() => winston.info("Connected to mongodb..."));
};

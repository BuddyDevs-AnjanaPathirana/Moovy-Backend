const express = require("express");
const genres = require("../Routes/Genres");
const customers = require("../Routes/Customers");
const movies = require("../Routes/Movies");
const rentals = require("../Routes/Rentals");
const users = require("../Routes/Users");
const auth = require("../Routes/auth");
const error = require("../Middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};

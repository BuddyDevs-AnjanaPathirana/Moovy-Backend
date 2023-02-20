const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./Routes/Genres");
const customers = require("./Routes/Customers");
const movies = require("./Routes/Movies");
const rentals = require("./Routes/Rentals");
const users = require("./Routes/Users");

mongoose
  .connect("mongodb://127.0.0.1/moovy")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Could not connect to mongodb..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);

//Define environmental variables

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

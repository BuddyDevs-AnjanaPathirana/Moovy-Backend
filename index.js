const express = require("express");
const mongoose = require("mongoose");
const app = express();
const genres = require("./Routes/Genres");

mongoose
  .connect("mongodb://127.0.0.1/moovy")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Could not connect to mongodb..."));

app.use(express.json());
app.use("/api/genres", genres);

//Define environmental variables

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const auth = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");
const { Genre, validate } = require("../Models/Genre");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//###################################  Genres API  ###################################

//Getting all genres

router.get("/", async (req, res) => {
  // throw new Error("Getting data failed");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//Getting genre with a id

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid id");

  const genre = await Genre.findById(req.params.id);

  if (!genre) res.status(404).send("Genre with the given ID was not found");
  res.send(genre);
});

//Creating a new genre

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

//Updating a genre

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) res.status(404).send("Genre with the given ID was not found");

  res.send(genre);
});

//Delete a genre

router.delete("/:id", [auth, isAdmin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) res.status(404).send("Genre with the given ID was not found");

  res.send(genre);
});

module.exports = router;

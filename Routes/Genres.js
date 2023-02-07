const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

//###################################  Genre Schema & Create Genre Model  ###################################

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

//###################################  Genres API  ###################################

//Getting all genres

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//Getting genre with a id

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) res.status(404).send("Genre with the given ID was not found");
  res.send(genre);
});

//Creating a new genre

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

//Updating a genre

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
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

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) res.status(404).send("Genre with the given ID was not found");

  res.send(genre);
});

//Validate genre using Joi

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User } = require("../Models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//###################################  Auth API  ###################################

//Login a user

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;

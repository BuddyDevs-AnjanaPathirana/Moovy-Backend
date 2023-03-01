const express = require("express");
const router = express.Router();
const { User, validate } = require("../Models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//###################################  Users API  ###################################

//Creating a new user

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
  res
    .header("X-Auth-Token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

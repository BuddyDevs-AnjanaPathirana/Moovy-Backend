const auth = require("../Middleware/auth");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../Models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");

//###################################  Users API  ###################################

//Getting current user

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

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

  const token = user.generateAuthToken();
  res
    .header("X-Auth-Token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { User, validate } = require("../Models/User");

//###################################  Users API  ###################################

//Creating a new user

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.find(req.body.email);
  if (user) return res.status(400).send("User already exists");

  user = new User(
    { name: req.body.name },
    { email: req.body.email },
    { password: req.body.password }
  );
  await user.save();
  res.send(user);
});

module.exports = router;

const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

const validateUser = (user) => {
  const schema = {
    email: Joi.email().required(),
    password: Joi.string().required().min(5).max(255),
  };
  return Joi.validate(user, schema);
};

module.exports.validate = validateUser;
module.exports.User = User;

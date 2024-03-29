const auth = require("../Middleware/auth");
const { Customer, validate } = require("../Models/Customer"); //objectdestructing
const express = require("express");
const router = express.Router();

//###################################  Customers API  ###################################

//Getting all customers

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

//Getting customer with a id

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    res.status(404).send("Customer with the given ID was not found");
  res.send(customer);
});

//Creating a new customer

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();

  res.send(customer);
});

//Updating a customer

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!customer)
    res.status(404).send("Customer with the given ID was not found");

  res.send(customer);
});

//Delete a customer

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    res.status(404).send("Customer with the given ID was not found");

  res.send(customer);
});

module.exports = router;

const auth = require("../Middleware/auth");
const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../Models/Rental");
const { Customer } = require("../Models/Customer");
const { Movie } = require("../Models/Movie");

//###################################  Rentals API  ###################################

//Getting all rentals

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

//Creating a new rental

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie out of stock");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();
  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

module.exports = router;

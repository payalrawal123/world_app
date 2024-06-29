const express = require("express");
const { userRouter } = require("./userRouter");
const { userModel } = require("../models/user");
const Country = require("../models/countri");

const favoriteRouter = express.Router();

// Add to favorites
favoriteRouter .post("/",  async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const country = new Country(req.body);
    await country.save();
    user.favorites.push(country);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get favorites
favoriteRouter .get("/",  async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = favoriteRouter;
const express = require("express");

const { userModel } = require("../models/user");

const historyRouter = express.Router();

// Add to search history
historyRouter.post("/",  async (req, res) => {
  const { searchQuery } = req.body;
  try {
    const user = await userModel.findById(req.user.id);
    user.searchHistory = [
      searchQuery,
      ...user.searchHistory.filter((item) => item !== searchQuery),
    ].slice(0, 5);
    await user.save();
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get search history
historyRouter.get("/",  async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json(user.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = historyRouter;
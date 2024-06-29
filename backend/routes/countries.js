const express = require('express');
const axios = require('axios');

const { userModel } = require('../models/user');
const { verifyToken } = require('../middleware/auth.middleware');


const countriRouter = express.Router();

countriRouter.get('/:currencyCode', async (req, res) => {
  const { currencyCode } = req.params;
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    const countries = response.data.map(country => ({
      name: country.name.common,
      currency: country.currencies,
      capital: country.capital,
      languages: country.languages,
      flag: country.flags.png,
    }));

    const user = await userModel.findById(req.user.id);
    user.searchHistory = [currencyCode, ...user.searchHistory.slice(0, 4)];
    await user.save();

    res.json(countries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = {
    countriRouter
}
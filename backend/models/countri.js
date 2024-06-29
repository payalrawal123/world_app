const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: String,
  currency: String,
  capital: String,
  languages: [String],
  flag: String,
});
const countrieModel = mongoose.model("Country", CountrySchema);
module.exports = {
    countrieModel
}
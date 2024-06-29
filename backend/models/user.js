const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: String }],
    searchHistory: [{ type: String }],
});

const userModel = mongoose.model("User", UserSchema);

module.exports = {
    userModel
}
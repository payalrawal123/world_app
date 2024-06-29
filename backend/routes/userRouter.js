const express = require("express");
require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middleware/auth.middleware");

const { userModel } = require("../models/user");

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, async (req, res) => {
  const { data } = req.body.user;
  try {
    const userInfo = await userModel.findOne({ email: data.email });
    return res.send((user = userInfo));
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const saltRound = 10;
  try {
     const hashedPassword = await bcrypt.hash(password, saltRound);
    const isUser = new userModel({ name, email, password: hashedPassword });
    await isUser.save();
    return res.status(200).send({ error: false, item: isUser });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

  

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });

    const checkPassword = await bcrypt.compare(password, isUserExist.password);
    if (checkPassword) {
      const accessToken = jwt.sign(
        {
          data: { name: isUserExist.name, email: isUserExist.email },
        },
       "masai",
        { expiresIn: "2h" }
      );
      return res.status(200).send({ error: false, item: accessToken });
    } else {
      return res
        .status(500)
        .send({ error: true, message: "password is wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});



module.exports = {
  userRouter,
};

const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require('dotenv').config();

router.post("/signup", async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(409).json({ message: "Username already exists" });
    }
    const { username, email, password } = request.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
    });

    await newUser.save();
    response.status(200).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User does not exist!",
        data: [],
      });
    }

    isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        code: "401",
        message: "Invalid credentials",
        data: {},
      });
    }

    const accesstoken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "1y" }
    );

    const userData = {
      username: user.username,
      email: user.email,
      token: accesstoken,
    };

    return response.status(200).json({
      code: 200,
      message: "Login successful.",
      data: userData,
    });
  } catch (error) {
    response.status(500).json({ message: "Error", error: error.message });
  }
});

module.exports = router;

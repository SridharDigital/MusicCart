const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: "FAIL",
        message: "Email or mobile number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "Account created successfully",
      data: { token, user: { id: savedUser._id } },
    });
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login is executed");
  try {
    const { emailOrMobile, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrMobile.toLowerCase() }, { mobile: emailOrMobile }],
    });

    if (!user) {
      return res.status(400).json({
        status: "FAIL",
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "FAIL",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });

    res.json({
      status: "SUCCESS",
      message: "Login successful",
      data: { token, user: { id: user._id } },
    });
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user.model.js");
const checkLogin = require("../middlewares/checkLogin");

//SIGNUP
router.post("/signUp", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 12);
  try {
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "SignUp is successful",
    });
  } catch (err) {
    if (err) {
      res.status(500).json({
        error: "authentication failed",
      });
    } else {
      res.status(202).json({
        message: "Authentication successfully done",
      });
    }
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const user = await User.find({ userName: req.body.userName });
  try {
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            userName: user[0].userName,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          "access-token": token,
          message: "Login Successfully DOne",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});

module.exports = router;
